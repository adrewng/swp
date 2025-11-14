import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { path } from '~/constants/path'
import type { QueryConfig } from '~/hooks/useQueryConfig'
import useQueryParam from '~/hooks/useQueryParam'

type PathValue = (typeof path)['vehicle' | 'battery' | 'home']
type FilterKey = keyof QueryConfig

interface Props<K extends FilterKey = FilterKey> {
  queryConfig: QueryConfig
  pathName: PathValue
  param: K
  value: string
  hide?: boolean
  label: React.ReactNode
  rightBadge?: React.ReactNode
  className?: string
}

export default function FilterOptionLink<K extends FilterKey>({
  queryConfig,
  pathName,
  param,
  value,
  label,
  hide,
  rightBadge,
  className
}: Props<K>) {
  const navigate = useNavigate()

  const { [param]: paramValue } = useQueryParam()
  const isActive = paramValue === value
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isActive) {
      queryConfig[param] = value
    }

    if (isActive) {
      delete queryConfig[param]
    }

    const search = hide
      ? ''
      : new URLSearchParams({
          ...queryConfig,
          page: '1'
        }).toString()

    // const search = new URLSearchParams(newQueryConfig).toString()
    navigate({ pathname: pathName, search })
  }

  return (
    <button
      onClick={handleToggle}
      aria-pressed={isActive}
      className={classNames(
        'flex items-center gap-3 py-2 px-1 transition-colors hover:bg-gray-50 rounded-md w-full text-left',
        className
      )}
    >
      {/* Custom Checkbox */}
      <div
        className={classNames(
          'w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200',
          isActive ? 'bg-black border-black' : 'border-gray-300 bg-white hover:border-gray-400'
        )}
      >
        {isActive && (
          <svg
            className='w-3 h-3 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
          </svg>
        )}
      </div>

      {/* Label */}
      <span className={classNames('flex-1 text-sm font-medium', isActive ? 'text-black' : 'text-gray-700')}>
        {label}
      </span>

      {/* Right Badge */}
      {rightBadge !== -1 && (
        <span className='px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full'>{rightBadge}</span>
      )}
    </button>
  )
}
