import type { NextApiRequest, NextApiResponse } from 'next'
import { formatAmountForStripe } from 'utils/stripe-helpers'
import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from 'config'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
  typescript: true
})

interface RequestBody {
  amount: number
  email: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { amount, email }: RequestBody = req.body
    try {
      if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
        throw new Error('Invalid amount.')
      }

      const customer = await stripe.customers.list({ email })
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'donate',
        customer: customer.data[0] ? customer.data[0].id : undefined,
        customer_email: !customer.data[0] ? email : undefined,
        line_items: [
          {
            name: 'Donate to Amplify Hope',
            amount: formatAmountForStripe(amount, CURRENCY),
            currency: CURRENCY,
            quantity: 1
          }
        ],
        success_url: `${req.headers.origin}/result/{CHECKOUT_SESSION_ID}`,
        cancel_url: req.headers.origin as string
      }

      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params)
      res.status(200).json(checkoutSession)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error'
      res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
