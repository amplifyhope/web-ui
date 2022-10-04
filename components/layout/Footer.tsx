import { useRouter } from 'next/router'
import { Button } from 'components'

export const Footer = () => {
  const router = useRouter()

  return (
    <footer className='bg-primary-500 w-full h-[50vh] md:h-40 flex flex-col md:flex-row-reverse items-center justify-center md:justify-between md:px-24'>
      {router.pathname !== '/donate' ? (
        <div className='w-10/12 mb-20 md:w-auto md:mb-0'>
          <Button
            color='secondary'
            theme='outline'
            handleClick={() => router.push('/donate')}
          >
            Donate
          </Button>
        </div>
      ) : (
        <div className='md:w-auto md:mb-0'></div>
      )}
      <div className='w-10/12 md:w-auto'>
        <img
          src='/images/logo-linear-white.svg'
          alt='white logo'
          className='md:h-12 md:mb-4'
        />
        <div className='text-xs text-center text-white md:text-left'>
          <p>P.O. Box 231 Kuna, ID 83634</p>
          <p>©2022 Amplify Hope is a US 501(c)(3) non-profit,</p>
          <p>EIN 87-2385986</p>
        </div>
      </div>
    </footer>
  )
}
