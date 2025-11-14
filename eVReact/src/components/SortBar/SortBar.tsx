import classNames from 'classnames'
import { useMemo } from 'react'

import { useNavigate } from 'react-router-dom'
import type { path } from '~/constants/path'
import type { QueryConfig } from '~/hooks/useQueryConfig'

type Props = {
  queryConfig: QueryConfig
  pathName: (typeof path)['vehicle' | 'battery' | 'home']
  isFilterOpen: boolean
  onToggleFilter: () => void
}

// ... thêm key nào bạn có
const DISPLAY_LABEL: Partial<Record<keyof QueryConfig, string>> = {
  price_min: 'Giá từ',
  price_max: 'Giá đến'
}

// các key không hiển thị thành chip vì đã hiển thị ở sidebar
const HIDDEN_KEYS: (keyof QueryConfig)[] = ['page', 'limit', 'sort_by']

export default function SortBar({ queryConfig, onToggleFilter, isFilterOpen, pathName }: Props) {
  const navigate = useNavigate()

  // Tạo danh sách chips từ queryConfig
  const chips = useMemo(() => {
    const entries = Object.entries(queryConfig) as [keyof QueryConfig, string][]
    return entries
      .filter(([k, v]) => v && !HIDDEN_KEYS.includes(k))
      .map(([k, v]) => ({
        key: k,
        value: v,
        text: `${DISPLAY_LABEL[k] ?? String(k)}: ${v}`
      }))
  }, [queryConfig])

  const goWith = (next: Partial<QueryConfig>) => {
    const merged: QueryConfig = { ...queryConfig, ...next, page: '1' }
    // xoá key có giá trị undefined/null
    Object.keys(merged).forEach((k) => {
      const kk = k as keyof QueryConfig
      const val = merged[kk]
      if (val === undefined || val === null || val === '') delete merged[kk]
    })
    const search = new URLSearchParams(merged as Record<string, string>).toString()
    navigate({ pathname: pathName, search })
  }

  const removeOne = (key: keyof QueryConfig) => {
    const next = { ...queryConfig }
    delete next[key]
    goWith(next)
  }

  const clearAll = () => {
    // giữ lại sort nếu muốn; ở đây mình giữ luôn sort
    const { sort_by } = queryConfig
    goWith({ sort_by } as Partial<QueryConfig>)
  }

  const changeSort = (val: string) => {
    goWith({ sort_by: val })
  }

  return (
    <div className='flex items-center justify-between my-4 mx-3 gap-4'>
      {/* Left side: Filter button + Chips */}
      <div className='flex items-center gap-3 flex-1 min-w-0'>
        {/* Filter Button */}
        <button
          onClick={onToggleFilter}
          className={classNames(
            'flex items-center justify-center w-10 h-10 rounded-xl border text-sm font-medium flex-shrink-0',
            isFilterOpen ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-zinc-100 border-zinc-200 text-zinc-700'
          )}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75'
            />
          </svg>
        </button>

        {/* Chips */}
        <div className='flex flex-wrap items-center gap-2 min-w-0'>
          {chips.map((c) => (
            <button
              key={String(c.key)}
              className='group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-200 transition-colors'
              aria-label={`Remove ${c.text}`}
              onClick={() => removeOne(c.key)}
              title='Remove filter'
            >
              <span className='truncate max-w-[200px]'>{c.text}</span>
              <span className='inline-flex size-4 items-center justify-center rounded-full bg-zinc-200 group-hover:bg-zinc-300 text-zinc-600'>
                ×
              </span>
            </button>
          ))}

          {chips.length > 0 && (
            <button
              onClick={clearAll}
              className='text-sm font-medium text-zinc-500 hover:text-zinc-700 underline underline-offset-4'
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Right side: Sort Dropdown */}
      <div className='flex items-center gap-2 flex-shrink-0'>
        <label className='text-sm text-zinc-600 font-medium'>Sort</label>
        <select
          value={queryConfig.sort_by ?? 'recommended'}
          onChange={(e) => changeSort(e.target.value)}
          className='px-3 py-2 rounded-full border border-zinc-200 bg-zinc-100 text-sm text-zinc-700 hover:bg-zinc-200 transition-colors appearance-none cursor-pointer min-w-[140px]'
        >
          <option value='recommended'>Recommended</option>
          <option value='price_asc'>Price: Low to High</option>
          <option value='price_desc'>Price: High to Low</option>
          <option value='newest'>Newest</option>
        </select>
      </div>
    </div>
  )
}
