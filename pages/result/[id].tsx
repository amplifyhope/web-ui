import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { getCheckoutSession } from 'services/checkout'
import { formatAmountForDisplayFromStripe } from 'utils/stripe-helpers'
import { CURRENCY } from 'config'
import Stripe from 'stripe'

const Result = props => {
  const { id } = props
  const [session, setSession] = useState<Stripe.Checkout.Session>()
  const [loading, setLoading] = useState<boolean>(false)

  const fetchCheckout = async () => {
    setLoading(true)
    const checkoutSession = await getCheckoutSession(id)
    setSession(checkoutSession)
    setLoading(false)
  }

  useEffect(() => {
    fetchCheckout()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='w-11/12 lg:w-1/2 p-6 mx-auto my-0 mt-10 bg-white rounded shadow-md lg:h-96 flex  flex-col justify-evenly items-center'>
      <img className='h-0 lg:h-16' src='/images/logo-linear.svg' alt='logo' />
      <div className='text-base lg:text-xl mb-6'>
        Thank you for your{' '}
        {formatAmountForDisplayFromStripe(session?.amount_total!, CURRENCY)}{' '}
        {session?.mode === 'subscription' ? 'recurring' : null} donation to{' '}
        Amplify Hope: {session?.metadata?.fund}.
      </div>
      <div>
        <Link href='/'>
          <button className='py-2 px-4 border border-solid rounded border-primary hover:bg-black/10 text-primary'>
            {'<-- Back Home'}
          </button>
        </Link>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query

  return {
    props: {
      id
    }
  }
}

export default Result
