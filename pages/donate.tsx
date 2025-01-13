import { IconSettingsDollar } from '@tabler/icons-react'
import { CheckoutForm, Footer } from 'components'
import Link from 'next/link'
import { useState } from 'react'

const Donate = () => {
  const [isRecurring, setIsRecurring] = useState<boolean>(false)
  const activeTabStyle = 'border-b-2 border-b-primary text-black'
  return (
    <div>
      <section className='flex flex-col items-center justify-between w-full h-screen bg-ahBlue'>
        <div></div>
        <div className='w-full bg-donate bg-no-repeat bg-[bottom_left_-25rem] h-full md:h-full md:bg-bottom bg-cover'>
          <div className='w-full h-full bg-ahBlue bg-opacity-70'>
            <div className='flex flex-col items-center justify-center w-full h-full px-8'>
              <p className='mb-8 text-6xl font-bold text-center text-white md:text-8xl font-heading'>
                Donate
              </p>
              <p className='text-center text-white md:text-2xl'>
                Your gift will help us to empower people for community
                transformation
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='flex items-center justify-center py-8'>
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
          <Link className='mt-8 flex' href='/auth/signin'>
            <IconSettingsDollar className='mr-2' /> Manage my giving
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Donate
