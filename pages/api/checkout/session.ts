import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
  typescript: true
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { price } = req.body;
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price,
            quantity: 1
          }
        ],
        mode: 'payment',
        success_url: `${ req.headers.origin }/?success=true`,
        cancel_url: `${ req.headers.origin }/?canceled=true`
      });
      res.redirect(303, session.url!);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed')
  }
}