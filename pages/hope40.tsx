import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'components'
import { NextPage } from 'next'
import Image from 'next/image'
import hope40Graphic from '../public/images/hope-40-infographic.png'
import hope40GraphicLarge from '../public/images/hope-40-infographic-lg.png'

const Hope40: NextPage = () => {
  const [screenSize, setScreenSize] = useState<number>(0)
  const router = useRouter()

  useEffect(() => {
    setScreenSize(window.innerWidth)
  }, [screenSize])

  return (
    <div className='flex flex-col items-center w-11/12 mx-auto my-0 mt-8 lg:w-4/5'>
      <p className='text-lg font-semibold text-center'>Hope 40 Challenge:</p>
      <p className='text-center'>
        Share hope with the underserved in the Philippines!
      </p>
      <video
        className='mt-4 rounded-md shadow-md lg:w-1/2'
        poster='/images/hope-40-logo.png'
        controls
        controlsList='nodownload'
      >
        <source
          src='https://ik.imagekit.io/amplifyhope/videos/hope-40-info.mp4'
          type='video/mp4'
        />
      </video>
      <p className='mt-4 text-lg font-semibold text-center'>Get Involved</p>
      <Button
        color='primary'
        theme='contained'
        handleClick={() => {
          router.push('/')
        }}
      >
        Become a Sponsor
      </Button>
      <p className='mt-8 text-lg font-semibold'>Participate!</p>
      {screenSize > 1024 ? (
        <Image
          className='w-2/3 rounded-md shadow-md'
          src={hope40GraphicLarge}
          alt='hope40 info graphic'
        />
      ) : (
        <Image
          className='rounded-md shadow-md'
          src={hope40Graphic}
          alt='hope40 info graphic'
        />
      )}
      <a
        href='https://www.facebook.com/events/1258158334931141'
        className='w-full no-underline lg:w-auto'
        target='_blank'
        rel='noreferrer'
      >
        <button className='mx-auto w-full bg-[#1877f2] hover:bg-[#1865f2] text-white flex items-center justify-center px-6 py-2 rounded-md my-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='25'
            height='25'
            fill='currentColor'
            className='mr-3 bi bi-facebook'
            viewBox='0 0 16 16'
          >
            {' '}
            <path
              d='M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z'
              fill='white'
            ></path>{' '}
          </svg>
          Hope 40 Challenge
        </button>
      </a>
    </div>
  )
}

export default Hope40
