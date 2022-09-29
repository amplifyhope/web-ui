import { CheckoutForm } from 'components'
import { useState } from 'react'

const Donate = () => {
  const [isRecurring, setIsRecurring] = useState<boolean>(false)
  const activeTabStyle = 'border-b-2 border-b-primary text-black'
  return (
    <div className='flex flex-col items-center justify-center w-full lg:w-1/2 lg:ml-4'>
      <div className='flex items-center justify-between w-full my-4 lg:h-20'>
        <button
          className={`flex lg:text-lg items-center justify-center w-1/2 h-4/6 hover:bg-black/10 ${
            !isRecurring ? activeTabStyle : 'text-gray-500'
          }`}
          onClick={() => setIsRecurring(false)}
        >
          One Time Donation
        </button>
        <button
          className={`flex lg:text-lg items-center justify-center w-1/2 h-4/6 hover:bg-black/10 ${
            isRecurring ? activeTabStyle : 'text-gray-500'
          }`}
          onClick={() => setIsRecurring(true)}
        >
          Recurring Donation
        </button>
      </div>
      <CheckoutForm isRecurring={isRecurring} />
    </div>
  )
}

export default Donate
