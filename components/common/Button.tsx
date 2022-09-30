import { ReactNode } from 'react'

type ButtonProps = {
  color: 'primary' | 'secondary' | 'errorColor'
  theme: 'contained' | 'outline'
  handleClick: () => void
  children?: ReactNode
}

export const Button = ({
  color,
  theme,
  handleClick,
  children
}: ButtonProps) => {
  const buttonStyle = `w-full lg:w-auto px-6 py-2 rounded-md text-white ${
    theme === 'contained'
      ? `bg-${color}-500 hover:bg-${color}-900`
      : `border-2 border-white border-solid hover:bg-black/10 text-${color}-500`
  }`
  return (
    <button className={buttonStyle} onClick={handleClick}>
      {children}
    </button>
  )
}
