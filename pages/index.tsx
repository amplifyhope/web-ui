import { Button } from 'components'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import LearnMoreOne from '../public/images/homepage-learn-more-1.jpeg'
import Logo from '../public/images/logo-linear-white.svg'

const Home: NextPage = () => {
  const router = useRouter()
  return (
    <div>
      <section className='flex flex-col items-center justify-between w-full h-screen bg-ahBlue'>
        <div></div>
        <div className='w-full bg-homepage-main bg-no-repeat bg-[bottom_left_-15rem] h-2/3 bg-cover'>
          <div className='w-full h-full bg-gradient-to-b from-ahBlue'>
            <div className='absolute top-0 flex flex-col items-start justify-center w-full h-full px-8'>
              <p className='mb-48 text-4xl font-bold text-center text-white font-subheading'>
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
      <section className='w-full h-[75vh] flex flex-col justify-evenly items-center px-8'>
        <Image
          src={LearnMoreOne}
          alt='filipino EMT with children'
          className='rounded-md shadow-sm'
        />
        <p className='text-xl text-center text-ahGray'>
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
      <section className='bg-ahBlue w-full h-[75vh] flex flex-col items-center justify-between relative'>
        <div></div>
        <div className='w-full h-64 bg-bottom bg-no-repeat bg-cover bg-learn-more-2'>
          <div className='w-full h-full bg-gradient-to-b from-ahBlue'>
            <p className='absolute top-0 px-5 py-10 text-lg text-center text-white'>
              Our volunteers have a heart to serve by passing on their gifts and
              talents to those who are seeking to develop themselves for a
              brighter future. We exist to support existing local initiatives,
              not replace them. Therefore, we provide{' '}
              <span className='font-semibold'>
                supplemental education, community healthcare
              </span>
              , and{' '}
              <span className='font-semibold'>humanitarian assistance</span>,
              shoulder-to-shoulder with leaders already working in public
              service.
            </p>
          </div>
        </div>
      </section>
      <footer className='bg-primary-500 w-full h-[50vh] flex flex-col items-center justify-center'>
        <div className='w-10/12 mb-20'>
          <Button
            color='secondary'
            theme='outline'
            handleClick={() => router.push('/donate')}
          >
            Donate
          </Button>
        </div>
        <div className='w-10/12'>
          <Image src={Logo} alt='white logo' />
          <div className='text-xs text-center text-white'>
            <p>P.O. Box 231 Kuna, ID 83634</p>
            <p>©2022 Amplify Hope is a US 501(c)(3) non-profit,</p>
            <p>EIN 87-2385986</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
