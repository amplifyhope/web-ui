import { Footer } from 'components'
import { withRouter } from 'next/router'

const Verify = props => {
  return (
    <div className='flex flex-col items-center w-full h-screen'>
      <div className='lg:mt-20 mt-40 mb-20 lg:mb-40 flex flex-col items-center justify-center w-5/6 h-full md:w-2/3 lg:w-1/3'>
        <p className='text-4xl font-bold font-subheading'>Check Your Email</p>
        <p className='text-lg my-8'>
          We&lsquo;ve sent a magic link to{' '}
          <span className='font-bold'>{props.router.query.email}</span>. The
          link will expire, so please click on it soon.
        </p>
        <p className='text-sm'>
          Can&lsquo;t find your magic link? Check your spam folder!
        </p>
      </div>
      <div className='lg:fixed bottom-0 w-full'>
        <Footer />
      </div>
    </div>
  )
}

export default withRouter(Verify)
