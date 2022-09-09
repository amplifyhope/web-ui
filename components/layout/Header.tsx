import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
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

  const navLinks: NavLink[] = [
    { title: 'Home', path: '/' },
    { title: 'Hope40', path: '/hope40' }
  ]

  return (
    <div>
      <div className='flex items-center justify-between w-full px-6 bg-primary-500 h-14'>
        {screenSize > 1024 ? (
          <div className='w-11/12 flex items-center justify-end text-white'>
            {navLinks.map((link, index) => (
              <div key={index} className='ml-4'>
                <Link href={link.path}>
                  <a onClick={() => setShowNav(false)}>{link.title}</a>
                </Link>
              </div>
            ))}
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
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='white'
                className='fixed z-10 w-6 h-6 right-6'
                onClick={() => setShowNav(false)}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            )}
          </>
        )}
      </div>
      <div
        className={`h-1/5 fixed top-0 flex flex-col items-end justify-start w-1/3 p-6 pt-2 text-white mt-14 ${
          !showNav ? '-right-1/3' : 'right-0'
        } bg-primary-500 transition-all duration-100 ease-in-out`}
      >
        {navLinks.map((link, index) => (
          <div key={index} className='mb-4'>
            <Link href={link.path}>
              <a onClick={() => setShowNav(false)}>{link.title}</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
