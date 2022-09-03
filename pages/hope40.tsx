import Link from 'next/link'

const Hope40 = () => {
  return (
    <div className='flex flex-col items-center w-full mt-8'>
      <p className='text-lg font-semibold text-center'>Hope 40 campaign:</p>
      <p className='text-center'>
        Share hope with the underserved in the Philippines!
      </p>
      <video
        className='w-11/12 mt-4 rounded-md shadow-md'
        poster='/images/hope-40-logo.png'
        controls
        controlsList='nodownload'
      >
        <source src='/videos/hope-40-info.mp4' type='video/mp4' />
      </video>
      <p className='mt-4 text-lg font-semibold text-center'>Get Involved</p>
      <Link href='/' className='text-center'>
        Donate
      </Link>
      <p className='mt-8 text-lg font-semibold'>Participate!</p>
      <video className='w-11/12 mt-1 rounded-md shadow-md' controls>
        <source src='/videos/ps-pride-test.mp4' type='video/mp4' />
      </video>
    </div>
  )
}

export default Hope40
