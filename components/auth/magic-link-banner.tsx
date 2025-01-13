import { IconWand } from '@tabler/icons-react'

export const MagicLinkBanner = () => {
  return (
    <div className='flex items-center justify-between mt-8 rounded py-4 px-8 bg-background-600/50'>
      <IconWand className='mr-2' />
      <p className='text-sm'>
        We&lsquo;ll email you a magic link for a password-free sign in.
      </p>
    </div>
  )
}
