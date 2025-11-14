import { useId, type InputHTMLAttributes } from 'react'
import type { FieldPath, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'

interface PropsInput<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string
  errorClassName?: string
  errorMsg?: string
  labelClassName?: string
  register?: UseFormRegister<T>
  rules?: RegisterOptions<T, FieldPath<T>>
  label: string
  name: FieldPath<T>
  type?: string
}

export default function InputStyle<T extends FieldValues = FieldValues>({
  className = '',
  errorClassName = 'overflow-hidden transition-all duration-200 mt-1 text-xs text-red-600 min-h-[1.25rem]',
  inputClassName = '',
  labelClassName = '',
  errorMsg,
  register,
  rules,
  label,
  name,
  type,
  ...rest
}: PropsInput<T>) {
  const id = useId()

  // Custom register để handle number conversion
  const registerResult =
    register && name
      ? register(name, {
          ...rules,
          setValueAs: (value) => {
            if (type === 'number' && value !== '') {
              return Number(value)
            }
            return value
          }
        })
      : undefined

  const hasError = Boolean(errorMsg)

  return (
    <div className={`group relative ${className}`}>
      <label
        htmlFor={id}
        className={`block text-sm font-medium mb-2 ${hasError ? 'text-red-600' : 'text-zinc-700'} ${labelClassName}`}
      >
        {label}
      </label>

      <input
        id={id}
        className={`
          peer block w-full bg-transparent px-0 py-3 border-0 border-b outline-none text-sm md:text-base
          transition-[border-color] duration-200 focus:ring-0
          ${hasError ? 'border-b-red-500 focus:border-b-red-600' : 'border-b-zinc-300 hover:border-b-zinc-400 focus:border-b-black'}
          ${inputClassName}
        `}
        {...registerResult}
        {...rest}
      />

      {/* ERROR */}
      <div className={`${errorClassName} ${hasError ? 'opacity-100' : 'opacity-0'}`}>{errorMsg}</div>
    </div>
  )
}
