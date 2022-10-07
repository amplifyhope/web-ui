import { Button, Footer } from 'components'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()
  return (
    <div>
      <section className='flex flex-col items-center justify-between w-full h-screen bg-ahBlue'>
        <div></div>
        <div className='w-full bg-homepage-main bg-no-repeat bg-[bottom_left_-15rem] h-2/3 md:h-full md:bg-bottom bg-cover'>
          <div className='w-full h-full bg-gradient-to-b from-ahBlue md:bg-ahBlue md:bg-opacity-50'>
            <div className='absolute top-20 flex flex-col items-start justify-center w-full h-[calc(100%_-_5rem)] px-8 md:px-24'>
              <p className='mb-48 text-4xl font-bold text-center text-white md:leading-relaxed md:mb-12 md:text-6xl md:w-3/5 md:text-left font-subheading'>
                Empowering People, Transforming Communities
              </p>
              <Button
                color='primary'
                theme='contained'
                handleClick={() => {
                  router.push('/donate')
                }}
              >
                Donate
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className='w-full h-[75vh] flex flex-col lg:flex-row justify-evenly lg:justify-between items-center px-8 lg:px-24'>
        <img
          src='/images/homepage-learn-more-1.jpeg'
          alt='filipino EMT with children'
          className='rounded-md shadow-sm md:w-9/12 lg:w-5/12'
        />
        <p className='text-xl text-center md:text-2xl lg:text-3xl lg:text-right text-ahGray lg:w-6/12 lg:leading-relaxed'>
          Our mission is to{' '}
          <span className='font-semibold'>empower people</span> for{' '}
          <span className='font-semibold'>community transformation</span> by
          providing education, resources, and opportunities to serve,
          concentrating on the “least resourced” demographics.
        </p>
        {/* <Button
          color='primary'
          theme='contained'
          handleClick={() => router.push('/donate')}
        >
          Learn More
        </Button> */}
      </section>
      <section className='bg-ahBlue w-full h-[90vh] lg:h-[75vh] flex flex-col items-center lg:items-start justify-between relative'>
        <div className='lg:hidden'></div>
        <div className='w-full h-64 bg-bottom bg-no-repeat bg-cover md:h-4/6 lg:h-full lg:w-7/12 lg:bg-right bg-samson-family'>
          <div className='w-full h-full bg-gradient-to-b lg:bg-gradient-to-l from-ahBlue'>
            <p className='absolute top-0 px-5 py-10 text-base text-center text-white md:text-2xl lg:top-18 xl:top-24 lg:right-0 lg:text-xl xl:text-2xl lg:text-right lg:w-6/12 lg:leading-relaxed'>
              Amplify Hope is responsible for empowering and equipping several
              international humanitarian projects including the International
              Service Corps of Asia and Hope Rescue EMS. Edwin and Amy Samson
              serve as ground workers and directors and are passionate about
              community transformation. They are grateful for the many
              volunteers, donors, groups, organizations, and churches that
              support the work. If you are interested in making a difference in
              someone&apos;s life through giving, then you&apos;ve reached the
              right page. For more information about the Samsons or our
              projects, you can visit the following websites:{' '}
              <a
                href='https://www.samsonadventures.com/'
                target='_blank'
                rel='noreferrer'
              >
                samsonadventures.com
              </a>{' '}
              or{' '}
              <a
                href='https://www.iservicecorps.org/'
                target='_blank'
                rel='noreferrer'
              >
                iservicecorps.org
              </a>
              . If you&apos;d like to be involved as a volunteer, please contact
              the Samsons at{' '}
              <a href='mailto:info@amplifyhope.cc'>info@amplifyhope.cc</a>.
              Blessings to you all!
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Home
