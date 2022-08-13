import type { NextPage } from 'next'
import { useState } from 'react'
import { CheckoutForm, Header } from 'components'

const Home: NextPage = () => {
  const [isRecurring, setIsRecurring] = useState<boolean>(false)
  const activeTabStyle = 'border-b-2 border-b-primary text-black'
  return (
    <div>
      <Header />
      <div className='flex flex-col items-center justify-center w-4/5 mx-auto mb-0 mt-14'>
        <img className='h-16' src='/images/logo-linear.svg' alt='logo' />
        <div className='flex items-center justify-between w-1/2 h-20 my-4'>
          <button
            className={`flex text-lg items-center justify-center w-1/2 h-4/6 hover:bg-black/10 ${
              !isRecurring ? activeTabStyle : 'text-gray-500'
            }`}
            onClick={() => setIsRecurring(false)}
          >
            One Time Donation
          </button>
          <button
            className={`flex text-lg items-center justify-center w-1/2 h-4/6 hover:bg-black/10 ${
              isRecurring ? activeTabStyle : 'text-gray-500'
            }`}
            onClick={() => setIsRecurring(true)}
          >
            Recurring Donation
          </button>
        </div>
        <CheckoutForm isRecurring={isRecurring} />
      </div>
    </div>
  )
}

export default Home
