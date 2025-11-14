import { useId, type SelectHTMLAttributes } from 'react'
import type { FieldPath, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'

interface SelectOption {
  value: string
  label: string
}

interface PropsSelect<T extends FieldValues> extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'name'> {
  selectClassName?: string
  errorClassName?: string
  errorMsg?: string
  labelClassName?: string
  register?: UseFormRegister<T>
  rules?: RegisterOptions<T, FieldPath<T>>
  label: string
  name: FieldPath<T>
  options: SelectOption[]
  placeholder?: string
}

export default function Select<T extends FieldValues = FieldValues>({
  className = '',
  errorClassName = 'overflow-hidden transition-all duration-200 mt-1 text-xs text-red-600 min-h-[1.25rem]',
  selectClassName = '',
  labelClassName = '',
  errorMsg,
  register,
  rules,
  label,
  name,
  options,
  placeholder = 'Vui lòng chọn...',
  ...rest
}: PropsSelect<T>) {
  const id = useId()
  const registerResult = register && name ? register(name, rules) : undefined
  const hasError = Boolean(errorMsg)

  return (
    <div className={`group relative ${className}`}>
      {/* SELECT */}
      <select
        id={id}
        className={`
          peer block w-full bg-transparent px-0 py-3 border-0 border-b outline-none text-sm md:text-base
          transition-[border-color] duration-200 focus:ring-0
          ${
            hasError
              ? 'border-b-red-500 focus:border-b-red-600'
              : 'border-b-zinc-300 hover:border-b-zinc-400 focus:border-b-black'
          }
          ${selectClassName}
        `}
        {...registerResult}
        {...rest}
      >
        <option value='' disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label
        htmlFor={id}
        className={`
          absolute left-0 pointer-events-none transition-all duration-200
          top-1/2 -translate-y-1/2 text-zinc-500
          group-hover:top-0 group-hover:-translate-y-3 group-hover:text-xs
          peer-focus:top-0 peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-black
          peer-[&:not([value=''])]:top-0 peer-[&:not([value=''])]:-translate-y-3 peer-[&:not([value=''])]:text-xs
          ${hasError ? 'text-red-600 peer-focus:text-red-600' : ''}
          ${labelClassName}
        `}
      >
        {label}
      </label>

      {/* ERROR */}
      <div className={`${errorClassName} ${hasError ? ' opacity-100' : 'opacity-0'}`}>{errorMsg}</div>
    </div>
  )
}
