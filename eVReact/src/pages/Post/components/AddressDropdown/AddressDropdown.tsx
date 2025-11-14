import { useEffect, useRef, useState } from 'react'

interface Option {
  value: string | number
  label: string
}

interface AddressDropdownProps {
  label: string
  placeholder: string
  options: Option[]
  value: string | number
  onChange: (value: string) => void
  disabled?: boolean
  required?: boolean
}

export default function AddressDropdown({
  label,
  placeholder,
  options,
  value,
  onChange,
  disabled = false,
  required = false
}: AddressDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }
  // Close dropdown when clicking outside
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleOptionSelect = (optionValue: string | number) => {
    onChange(String(optionValue))
    setIsOpen(false)
  }

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div ref={dropdownRef} className='relative'>
      {/* Label */}
      <label className='block text-sm font-medium text-zinc-700 mb-2'>
        {label} {required && '*'}
      </label>

      {/* Custom dropdown trigger */}
      <div className='relative'>
        <button
          type='button'
          onClick={handleToggle}
          disabled={disabled}
          className={`
            w-full px-3 py-2 border rounded-lg text-left transition-colors
            ${
              disabled
                ? 'bg-zinc-100 cursor-not-allowed border-zinc-200 text-zinc-400'
                : 'bg-white hover:border-zinc-400 focus:ring-2 focus:ring-black focus:border-transparent'
            }
            ${isOpen ? 'border-black ring-2 ring-black' : 'border-zinc-300'}
            ${selectedOption ? 'text-zinc-900' : 'text-zinc-500'}
          `}
        >
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
          <svg
            className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            } ${disabled ? 'text-zinc-300' : ''}`}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </button>

        {/* Dropdown menu */}
        {isOpen && !disabled && (
          <div className='absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
            {options.length === 0 ? (
              <div className='px-4 py-3 text-sm text-zinc-500 text-center'>Không có dữ liệu</div>
            ) : (
              options.map((option) => (
                <button
                  key={option.value}
                  type='button'
                  onClick={() => handleOptionSelect(option.value)}
                  className={`w-full px-4 py-3 text-left text-sm hover:bg-zinc-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    value === option.value ? 'bg-zinc-100 text-black font-medium' : 'text-zinc-700'
                  }`}
                >
                  {option.label}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
