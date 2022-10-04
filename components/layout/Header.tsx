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

  const mobileNavLinks: NavLink[] = [
    { title: 'Hope40', path: '/hope40' },
    { title: 'Donate', path: '/donate' }
  ]

  const desktopNavLinks: NavLink[] = [{ title: 'Hope40', path: '/hope40' }]

  return (
    <div>
      <div className='absolute top-0 z-10 flex items-center justify-between w-full h-20 px-5 bg-black bg-opacity-50 lg:px-20'>
        {screenSize > 1024 ? (
          <div className='flex justify-between w-full mx-auto my-0 text-white'>
            <Image
              src={Logo}
              alt='logo-white'
              height={56}
              width={312.12}
              onClick={() => router.push('/')}
              className='cursor-pointer'
            />
            <div className='flex items-center justify-end w-full px-14'>
              {desktopNavLinks.map((link, index) => (
                <Link key={index} href={link.path}>
                  {link.title}
                </Link>
              ))}
            </div>
            <Button
              color='secondary'
              theme='outline'
              handleClick={() => router.push('/donate')}
            >
              Donate
            </Button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
      <div
        className={`z-20 h-screen fixed top-0 flex flex-col items-center justify-center w-full p-5 text-white ${
          !showNav ? '-top-full opacity-0' : 'top-0 opacity-100'
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
            <Link href={link.path}>
              <a
                onClick={() => setShowNav(false)}
                className='text-xl font-bold no-underline'
              >
                {link.title}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
