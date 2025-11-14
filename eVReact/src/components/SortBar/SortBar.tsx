// src/components/SortBar.tsx
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import type { path } from '~/constants/path'
import type { QueryConfig } from '~/hooks/useQueryConfig'

import {
  ORDER,
  SORT_BY,
  SORT_CHOICE_KEY,
  SORT_LABEL_BY_KEY,
  SORT_OPTIONS,
  type Order,
  type SortBy,
  type SortChoiceKey,
  type SortOption
} from '~/types/sort.type'
import Chip from './components/Chip'

type Props = {
  queryConfig: QueryConfig
  pathName: (typeof path)['vehicle' | 'battery' | 'home']
  isFilterOpen: boolean
  onToggleFilter: () => void
}

// Label chip (sửa warranty)
const DISPLAY_LABEL: Partial<Record<keyof QueryConfig, string>> = {
  price_min: 'Giá từ',
  price_max: 'Giá đến',
  capacity: 'Điện dung',
  voltage: 'Điện áp',
  color: 'Màu',
  health: 'Sức khoẻ',
  mileage: 'Số km đã đi',
  warranty: 'Bảo hành',
  power: 'Công suất',
  seat: 'Ghế ngồi'
}

// Ẩn chip cho các key này
const HIDDEN_KEYS: (keyof QueryConfig)[] = [
  'page',
  'limit',
  'sort_by',
  'order',
  'category_type',
  'category_id',
  'title'
]

export default function SortBar({ queryConfig, onToggleFilter, isFilterOpen, pathName }: Props) {
  const navigate = useNavigate()
  const [currentLabel, setSortLabel] = useState<string>(SORT_LABEL_BY_KEY[SORT_CHOICE_KEY.RECOMMENDED])

  useEffect(() => {
    const { sort_by, order } = queryConfig as { sort_by?: string; order?: 'asc' | 'desc' }
    let key: SortChoiceKey = SORT_CHOICE_KEY.RECOMMENDED
    let shouldFix = false

    if (sort_by === SORT_BY.PRICE) {
      if (order === ORDER.DESC) key = SORT_CHOICE_KEY.PRICE_DESC
      else if (order === ORDER.ASC) key = SORT_CHOICE_KEY.PRICE_ASC
      else shouldFix = true
    } else if (sort_by === SORT_BY.CREATED_AT) {
      key = SORT_CHOICE_KEY.NEWEST
      if (order && order !== ORDER.DESC) shouldFix = true
    } else if (sort_by === SORT_BY.RECOMMEND || sort_by === undefined) {
      key = SORT_CHOICE_KEY.RECOMMENDED
      if (order) shouldFix = true
    } else {
      shouldFix = true
    }

    setSortLabel(SORT_LABEL_BY_KEY[key])

    if (shouldFix) {
      goWith({ sort_by: SORT_BY.RECOMMEND, order: undefined })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryConfig.sort_by, queryConfig.order])

  const chips = useMemo(() => {
    const entries = Object.entries(queryConfig) as [keyof QueryConfig, unknown][]
    return entries
      .filter(([k, v]) => {
        if (HIDDEN_KEYS.includes(k)) return false
        if (v === undefined || v === null) return false
        if (typeof v === 'string' && v.trim() === '') return false
        return true
      })
      .map(([k, v]) => ({
        key: `${String(k)}:${String(v)}`,
        queryKey: k,
        value: String(v),
        text: `${DISPLAY_LABEL[k] ?? String(k)}: ${String(v)}`
      }))
  }, [queryConfig])

  const goWith = (next: Partial<QueryConfig>) => {
    const merged: QueryConfig = { ...queryConfig, ...next }
    Object.keys(merged).forEach((key) => {
      const val = merged[key as keyof QueryConfig]
      if (val === undefined || val === null || val === '') delete merged[key as keyof QueryConfig]
    })
    navigate({ pathname: pathName, search: createSearchParams(merged as Record<string, string>).toString() })
  }

  const removeOne = (key: keyof QueryConfig) => {
    goWith({ [key]: undefined } as Partial<QueryConfig>)
  }

  const clearAll = () => {
    return navigate({
      pathname: pathName,
      search: createSearchParams({
        page: '1',
        limit: '20'
      }).toString()
    })
  }

  const changeSort = (opt: SortOption) => {
    setSortLabel(SORT_LABEL_BY_KEY[opt.key])
    goWith({ sort_by: opt.sort_by, order: opt.order || undefined })
  }

  const isActive = (opt: SortOption) => {
    const curSort = queryConfig.sort_by as SortBy | undefined
    const curOrder = queryConfig.order as Order | undefined
    if (opt.key === SORT_CHOICE_KEY.RECOMMENDED) return curSort === SORT_BY.RECOMMEND
    return curSort === opt.sort_by && curOrder === opt.order
  }

  return (
    <div className='flex items-center justify-between my-4 mx-3 gap-4'>
      {/* Left: Filter + Chips */}
      <div className='flex items-center gap-3 flex-1 min-w-0'>
        <button
          onClick={onToggleFilter}
          className={classNames(
            'flex items-center justify-center w-10 h-10 rounded-xl border text-sm font-medium flex-shrink-0',
            isFilterOpen ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-zinc-100 border-zinc-200 text-zinc-700'
          )}
          aria-label='Bật/tắt bộ lọc'
          title='Bộ lọc'
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

        <div className='flex flex-wrap items-center gap-2 min-w-0'>
          {chips.map((c) => (
            <Chip key={c.key} text={c.text} title={c.text} onRemove={() => removeOne(c.queryKey)} />
          ))}
          {chips.length > 0 && (
            <button
              onClick={clearAll}
              className='text-sm font-medium text-zinc-500 hover:text-zinc-700 underline underline-offset-4'
            >
              Xoá tất cả
            </button>
          )}
        </div>
      </div>

      {/* Right: Sort Popover */}
      <div className='flex items-center gap-2 flex-shrink-0'>
        <label className='text-sm text-zinc-600 font-medium'>Sắp xếp</label>

        <Popover className='relative'>
          <PopoverButton className='px-3 py-2 rounded-full border border-zinc-200 bg-zinc-100 text-sm text-zinc-700 hover:bg-zinc-200 transition-colors min-w-[200px] text-left focus:outline-none data-focus:outline data-focus:outline-zinc-400'>
            <div className='flex items-center justify-between gap-3'>
              <span className='truncate'>{currentLabel}</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='size-4 opacity-70'
              >
                <path
                  fillRule='evenodd'
                  d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </PopoverButton>

          <PopoverPanel
            anchor='bottom end'
            transition
            className='z-20 mt-2 w-72 rounded-xl border border-zinc-200 bg-white shadow-lg transition duration-150 ease-out data-closed:translate-y-1 data-closed:opacity-0'
          >
            <div className='p-2'>
              {SORT_OPTIONS.map((opt) => {
                const active = isActive(opt)
                return (
                  <button
                    key={opt.key}
                    onClick={() => changeSort(opt)}
                    className={classNames(
                      'w-full text-left rounded-lg px-3 py-2 text-sm transition',
                      active ? 'bg-zinc-100 text-zinc-900' : 'hover:bg-zinc-50 text-zinc-700'
                    )}
                  >
                    <div className='flex items-center justify-between'>
                      <span>{opt.label}</span>
                      {active && (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          className='size-4'
                        >
                          <path
                            fillRule='evenodd'
                            d='M16.707 5.293a1 1 0 00-1.414 0L8.5 12.086l-3.293-3.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l7-7a1 1 0 000-1.414z'
                            clipRule='evenodd'
                          />
                        </svg>
                      )}
                    </div>
                    {opt.desc && <p className='mt-0.5 text-xs text-zinc-500'>{opt.desc}</p>}
                  </button>
                )
              })}
            </div>
          </PopoverPanel>
        </Popover>
      </div>
    </div>
  )
}
