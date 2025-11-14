import { useEffect, useId, useRef, useState, type InputHTMLAttributes } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface PropsSelectDropdown extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  className?: string
  selectClassName?: string
  labelClassName?: string
  errorClassName?: string
  errorMsg?: string
  options: SelectOption[]
  label: string
  onChange?: (value: string) => void
}

export default function SelectDropdown({
  className = '',
  errorClassName = 'overflow-hidden transition-all duration-200 mt-1 text-xs text-red-600 min-h-[1.25rem]',
  selectClassName = '',
  labelClassName = '',
  errorMsg,
  label,
  options,
  value,
  onChange,
  onBlur,
  placeholder = 'Vui lòng chọn...'
}: PropsSelectDropdown) {
  const id = useId()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fallback nếu value là undefined hoặc null
  const displayValue = value || ''
  const displaySelectedOption = options.find((o) => o.value === displayValue)

  // đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onBlur])

  const handleOptionSelect = (selectedValue: string) => {
    setIsOpen(false)
    onChange?.(selectedValue)
  }

  return (
    <div ref={dropdownRef} className={`group relative ${className}`}>
      <label
        htmlFor={id}
        className={`block text-sm font-medium mb-2 ${errorMsg ? 'text-red-600' : 'text-zinc-700'} ${labelClassName}`}
      >
        {label}
      </label>

      {/* Trigger */}
      <div className='relative'>
        <button
          id={id}
          type='button'
          onClick={() => setIsOpen((v) => !v)}
          className={`
            peer block w-full bg-transparent px-0 py-3 border-0 border-b outline-none text-sm md:text-base
            transition-[border-color] duration-200 focus:ring-0 text-left
            ${errorMsg ? 'border-b-red-500 focus:border-b-red-600' : 'border-b-zinc-300 hover:border-b-zinc-400 focus:border-b-black'}
            ${displayValue ? 'text-zinc-900' : 'text-zinc-500'}
            ${selectClassName}
          `}
        >
          <span className={displayValue ? 'text-zinc-900' : 'text-zinc-500'}>
            {displaySelectedOption ? displaySelectedOption.label : placeholder}
          </span>
          <svg
            className={`absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </button>

        {/* Menu */}
        {isOpen && (
          <div className='absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-zinc-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto'>
            {options.map((option) => (
              <button
                key={option.value}
                type='button'
                onClick={() => handleOptionSelect(option.value)}
                className={`w-full px-4 py-3 text-left text-sm hover:bg-zinc-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl ${
                  displayValue === option.value ? 'bg-zinc-100 text-black font-medium' : 'text-zinc-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error */}
      <div className={`${errorClassName} ${errorMsg ? 'opacity-100' : 'opacity-0'}`}>{errorMsg}</div>
    </div>
  )
}
