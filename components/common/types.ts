import { ReactNode } from 'react'

export type ButtonProps = {
  color: 'primary' | 'secondary' | 'errorColor'
  theme: 'contained' | 'outline'
  handleClick: () => void
  children?: ReactNode
}
