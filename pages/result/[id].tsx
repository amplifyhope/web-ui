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
    return (
      <div className='w-full h-screen pt-24 pl-4 text-white bg-ahBlue'>
        Loading...
      </div>
    )
  }

  return (
    <div className='w-full h-screen pt-32 bg-ahBlue'>
      <div className='flex flex-col items-center w-11/12 p-6 mx-auto my-0 bg-white rounded shadow-md lg:w-1/2 lg:h-96 justify-evenly'>
        <div className='mb-6 text-base lg:text-xl'>
          Thank you for your{' '}
          {formatAmountForDisplayFromStripe(session?.amount_total!, CURRENCY)}{' '}
          {session?.mode === 'subscription' ? 'recurring' : null} donation to{' '}
          Amplify Hope: {session?.metadata?.fund}.
        </div>
        <div>
          <Link href='/'>
            <button className='px-4 py-2 border border-solid rounded border-primary hover:bg-black/10 text-primary'>
              {'<-- Back Home'}
            </button>
          </Link>
        </div>
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
