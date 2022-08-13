import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
  typescript: true
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: string = req.query.id as string
  try {
    if (!id.startsWith('cs_')) {
      throw Error('Incorrect CheckoutSession Id.')
    }
    const session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.retrieve(id, {
        expand: ['payment_intent']
      })
    res.status(200).json(session)
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Internal Server Error'
    res.status(500).json({ statusCode: 500, message: errorMessage })
  }
}
