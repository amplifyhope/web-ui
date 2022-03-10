import { NextApiRequest, NextApiResponse } from 'next';
import { formatAmountForStripe } from 'utils/stripe-helpers';
import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from 'config';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
  typescript: true
});

interface RequestBody {
  amount: number;
  email: string;
  interval: Stripe.PriceListParams.Recurring.Interval;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { amount, email, interval }: RequestBody = req.body;
    const formattedAmount = formatAmountForStripe(amount, CURRENCY);
    let price: Stripe.Price | undefined;

    try {
      if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
        throw new Error('Invalid amount');
      }

      const priceParams: Stripe.PriceListParams = {
        product: process.env.STRIPE_RECURRING_PRODUCT_ID,
        lookup_keys: [formattedAmount.toString()],
        recurring: { interval }
      };

      const foundPrice = await stripe.prices.list(priceParams);
      price = foundPrice.data[0];

      if (!price) {
        const priceCreateParams: Stripe.PriceCreateParams = {
          currency: CURRENCY,
          product: process.env.STRIPE_RECURRING_PRODUCT_ID,
          unit_amount: formattedAmount,
          lookup_key: formattedAmount.toString(),
          recurring: { interval }
        };

        price = await stripe.prices.create(priceCreateParams);
      }

      const customer = await stripe.customers.list({ email });
      const sessionParams: Stripe.Checkout.SessionCreateParams = {
        customer: customer.data[0] ? customer.data[0].id : undefined,
        customer_email: !customer.data[0] ? email : undefined,
        mode: 'subscription',
        line_items: [{ price: price.id, quantity: 1 }],
        success_url: `${req.headers.origin}/result/{CHECKOUT_SESSION_ID}`,
        cancel_url: req.headers.origin as string
      };

      const checkoutSession = await stripe.checkout.sessions.create(
        sessionParams
      );

      res.status(200).json(checkoutSession);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error';
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
