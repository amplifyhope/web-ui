import { ButtonProps } from './types'

export const Button = ({
  color,
  theme,
  handleClick,
  children
}: ButtonProps) => {
  const buttonStyle = `w-full lg:w-auto px-6 py-2 rounded-md ${
    theme === 'contained'
      ? `bg-${color}-500 hover:bg-${color}-600 text-white`
      : `border-2 border-primary-500 border-solid hover:bg-black/10 text-${color}-500`
  }`
  return (
    <button className={buttonStyle} onClick={handleClick}>
      {children}
    </button>
  )
}
