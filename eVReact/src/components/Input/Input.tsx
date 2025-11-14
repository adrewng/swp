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
}

export default function Input<T extends FieldValues = FieldValues>({
  className = '',
  errorClassName = 'overflow-hidden transition-all duration-200 mt-1 text-xs text-red-600 min-h-[1.25rem]',
  inputClassName = '',
  labelClassName = '',
  errorMsg,
  register,
  rules,
  label,
  name,
  ...rest
}: PropsInput<T>) {
  const id = useId()
  const registerResult = register && name ? register(name, rules) : undefined
  const hasError = Boolean(errorMsg)

  return (
    <div className={`group relative ${className}`}>
      {/* INPUT */}
      <input
        id={id}
        className={`
          peer block w-full bg-transparent px-0 py-3 border-0 border-b outline-none text-sm md:text-base
          transition-[border-color] duration-200 focus:ring-0 autofill:shadow-[inset_0_0_0px_1000px_white] autofill:text-fill-black 
          ${
            hasError
              ? 'border-b-red-500 focus:border-b-red-600'
              : 'border-b-zinc-300 hover:border-b-zinc-400 focus:border-b-blue-600'
          }
          ${inputClassName}
        `}
        {...registerResult}
        {...rest}
        placeholder=' '
      />

      <label
        htmlFor={id}
        className={`
          absolute left-0 pointer-events-none transition-all duration-200
          top-1/2 -translate-y-1/2 text-zinc-500
          group-hover:top-0 group-hover:-translate-y-3 group-hover:text-xs
          peer-focus:top-0 peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-blue-700
          peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-3 peer-[&:not(:placeholder-shown)]:text-xs
          ${hasError ? 'text-red-600 peer-focus:text-red-600' : ''}
          ${labelClassName}
        `}
      >
        {label}
      </label>

      {/* ERROR */}
      <div className={`${errorClassName} ${hasError ? '  opacity-100' : 'opacity-0'}`}>{errorMsg}</div>
    </div>
  )
}
