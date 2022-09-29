import { Button } from 'components'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import LearnMore from '../public/images/homepage-learn-more.jpeg'

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
          src={LearnMore}
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
        <Button
          color='primary'
          theme='contained'
          handleClick={() => router.push('/donate')}
        >
          Learn More
        </Button>
      </section>
      <section className='bg-ahBlue w-full h-[75vh]'></section>
      <footer className='bg-primary-500 w-full h-[20vh]'></footer>
    </div>
  )
}

export default Home
