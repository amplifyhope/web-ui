import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Button } from 'components'
import Logo from '../../public/images/logo-linear-white.svg'
import Link from 'next/link'

type NavLink = {
  title: string
  path: string
}

export const Header = () => {
  const [showNav, setShowNav] = useState<boolean>(false)
  const [screenSize, setScreenSize] = useState<number>(0)
  const router = useRouter()

  useEffect(() => {
    setScreenSize(window.innerWidth)
  }, [screenSize])

  const mobileNavLinks: NavLink[] = [{ title: 'Donate', path: '/donate' }]

  const desktopNavLinks: NavLink[] = []

  return (
    <div>
      <div className='absolute top-0 flex items-center justify-between w-full h-20 px-5 bg-black bg-opacity-50 lg:px-20'>
        <div className='justify-between hidden w-full mx-auto my-0 text-white lg:flex'>
          <Image
            src={Logo}
            alt='logo-white'
            height={56}
            width={312.12}
            onClick={() => router.push('/')}
            className='cursor-pointer'
          />
          <div className='flex items-center justify-end w-full px-14'>
            {desktopNavLinks
              ? desktopNavLinks.map((link, index) => (
                  <Link key={index} href={link.path}>
                    {link.title}
                  </Link>
                ))
              : null}
          </div>
          <Button
            color='secondary'
            theme='outline'
            handleClick={() => router.push('/donate')}
          >
            Donate
          </Button>
        </div>
        <div className='flex items-center justify-between w-full lg:hidden'>
          <img
            className='h-8 lg:hidden'
            src='/images/logo-linear-white.svg'
            alt='white logo'
            onClick={() => router.push('/')}
          />
          {!showNav ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='white'
              className='w-6 h-6 lg:hidden'
              onClick={() => setShowNav(true)}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              />
            </svg>
          ) : null}
        </div>
      </div>
      <div
        className={`z-10 h-screen fixed flex flex-col items-center justify-center w-full p-5 text-white ${
          !showNav ? '-top-full invisible' : 'top-0 visible'
        } bg-ahBlue transition-all duration-500 ease-in-out`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='white'
          className='absolute w-6 h-6 top-8 right-5'
          onClick={() => setShowNav(false)}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
        {mobileNavLinks.map((link, index) => (
          <div key={index} className='my-4'>
            <Link
              href={link.path}
              onClick={() => setShowNav(false)}
              className='text-xl font-bold no-underline'
            >
              {link.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
