import { ContactProps } from 'common/types'

export const Contact = ({ name, title }: ContactProps) => {
  return (
    <div className='w-3/4 bg-white rounded-lg py-6'>
      <p className='text-3xl font-bold text-center text-black font-subheading'>
        {name}
      </p>
      <p className='text-xl text-center text-black font-subheading'>{title}</p>
    </div>
  )
}
