import type { ButtonHTMLAttributes } from 'react'
import Spinner from '../Spinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export default function Button({ isLoading, className, children, disabled, ...rest }: ButtonProps) {
  const newClassName = className + ' flex justify-center items-center' + (disabled ? ' cursor-not-allowed' : '')
  return (
    <button className={newClassName} disabled={disabled} {...rest}>
      {isLoading && <Spinner />}
      <span>{children}</span>
    </button>
  )
}
