import { Footer, LoginWithEmailForm, MagicLinkBanner } from 'components'

const SignIn = () => {
  return (
    <div className='flex flex-col items-center w-full h-screen bg-ahBlue'>
      <div className='lg:mt-20 mt-40 mb-20 lg:mb-40 flex flex-col items-center justify-center w-full h-full md:w-2/3 lg:w-1/2 xl:w-1/3'>
        <p className='text-white text-4xl mb-6 font-bold font-subheading'>
          Sign In
        </p>
        <LoginWithEmailForm />
        <MagicLinkBanner />
      </div>
      <div className='lg:fixed bottom-0 w-full'>
        <Footer />
      </div>
    </div>
  )
}

export default SignIn
