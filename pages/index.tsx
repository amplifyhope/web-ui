import type { NextPage } from 'next'
import { useState } from 'react'
import { CheckoutForm } from 'components'

const Home: NextPage = () => {
  const [isRecurring, setIsRecurring] = useState<boolean>(false)
  const [readMore, setReadMore] = useState<boolean>(false)
  const activeTabStyle = 'border-b-2 border-b-primary text-black'

  return (
    <div>
      <div className='flex flex-col items-center justify-center w-11/12 mx-auto mb-0 lg:w-4/5 lg:mt-14'>
        <img
          className='h-0 lg:h-16 lg:visible'
          src='/images/logo-linear.svg'
          alt='logo'
        />
        <div className='flex flex-col items-center justify-between w-full mt-8 lg:flex-row lg:mt-14'>
          <div className='w-full lg:mx-auto lg:my-0 mb-4 lg:w-1/3 lg:mb-0'>
            <img
              className='mx-auto my-0 mb-4 rounded-md shadow-md h-40 lg:h-60'
              src='/images/samson-family.jpeg'
              alt='samson family'
            />
            <p
              className={`${!readMore ? 'h-24 lg:h-auto overflow-hidden' : ''}`}
            >
              Amplify Hope is responsible for empowering and equipping several
              international humanitarian projects including the International
              Service Corps of Asia and Hope Rescue EMS. Edwin and Amy Samson
              serve as ground workers and directors and are passionate about
              community transformation. They are grateful for the many
              volunteers, donors, groups, organizations, and churches that
              support the work. If you are interested in making a difference in
              someone’s life through giving, then you’ve reached the right page.
              For more information about the Samsons or our projects, you can
              visit the following websites:{' '}
              <a
                href='https://www.samsonadventures.com'
                target='_blank'
                rel='noreferrer'
              >
                samsonadventures.com
              </a>{' '}
              or&nbsp;
              <a
                href='https://www.iservicecorps.org'
                target='_blank'
                rel='noreferrer'
              >
                iservicecorps.org
              </a>
              . If you’d like to be involved as a volunteer, please contact the
              Samsons at{' '}
              <a href='mailto:info@amplifyhope.cc'>info@amplifyhope.cc</a>.
              Blessings to you all!
            </p>
            <div
              className='flex justify-start items-center mt-4 text-sm cursor-pointer text-slate-500 lg:hidden'
              onClick={() => setReadMore(!readMore)}
            >
              Read More&nbsp;&nbsp;
              {readMore ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4.5 15.75l7.5-7.5 7.5 7.5'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                  />
                </svg>
              )}
            </div>
          </div>
          <div className='flex flex-col items-center justify-center w-full lg:w-1/2 lg:ml-4'>
            <div className='flex items-center justify-between w-full lg:h-20 my-4'>
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
        </div>
      </div>
    </div>
  )
}

export default Home
