import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import * as React from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import type { path } from '~/constants/path'
import { formatTrieuOrTy } from '~/utils/formater'

type QueryConfig = Record<string, string | number | undefined | null>

const MIN = 0.5 // 500k
const MAX = 1500 // 1 tỷ 500 triệu
const STEP = 0.5
const MIN_DISTANCE = 20 // 5 triệu
const formatVND = (vTrieu: number) =>
  (vTrieu * 1_000_000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 })

export default function PriceRangeSlider({
  queryConfig,
  replace = true,
  pathname
}: {
  queryConfig?: QueryConfig
  replace?: boolean
  pathname?: (typeof path)['vehicle' | 'battery' | 'home']
}) {
  const navigate = useNavigate()
  const location = useLocation()

  const initMin = queryConfig?.price_min ? Number(queryConfig.price_min) : 1
  const initMax = queryConfig?.price_max ? Number(queryConfig.price_max) : 50
  const [value, setValue] = React.useState<number[]>([
    Math.max(MIN, Math.min(MAX - MIN_DISTANCE, initMin)),
    Math.max(MIN + MIN_DISTANCE, Math.min(MAX, initMax))
  ])

  // đồng bộ khi queryConfig thay đổi từ bên ngoài
  React.useEffect(() => {
    const a = queryConfig?.price_min ? Number(queryConfig.price_min) : value[0]
    const b = queryConfig?.price_max ? Number(queryConfig.price_max) : value[1]
    const next: [number, number] = [
      Math.max(MIN, Math.min(MAX - MIN_DISTANCE, a)),
      Math.max(MIN + MIN_DISTANCE, Math.min(MAX, b))
    ]
    if (next[0] !== value[0] || next[1] !== value[1]) setValue(next)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryConfig?.price_min, queryConfig?.price_max])

  const handleChange = (_: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) return
    const [a, b] = newValue
    if (b - a < MIN_DISTANCE) {
      if (activeThumb === 0) {
        const clamped = Math.min(a, MAX - MIN_DISTANCE)
        setValue([clamped, clamped + MIN_DISTANCE])
      } else {
        const clamped = Math.max(b, MIN + MIN_DISTANCE)
        setValue([clamped - MIN_DISTANCE, clamped])
      }
    } else {
      setValue(newValue)
    }
  }

  const handleApply = () => {
    navigate(
      {
        pathname: pathname ?? location.pathname,
        search: createSearchParams({
          ...queryConfig,
          page: '1',
          price_min: value[0].toString(),
          price_max: value[1].toString()
        }).toString()
      },
      { replace }
    )
  }

  return (
    <div className='py-4 w-full'>
      <Slider
        value={value}
        onChange={handleChange}
        min={MIN}
        max={MAX}
        step={STEP}
        valueLabelDisplay='on'
        valueLabelFormat={formatTrieuOrTy}
        disableSwap
        sx={{
          color: '#000',
          height: 6,
          '& .MuiSlider-track': { border: 'none', height: 6 },
          '& .MuiSlider-rail': { opacity: 0.3, height: 6 },
          '& .MuiSlider-thumb': {
            height: 18,
            width: 18,
            backgroundColor: '#fff',
            border: '2px solid currentColor',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.22)' },
            '&:focus, &.Mui-active': { boxShadow: '0 0 0 6px rgba(0,0,0,0.12)' }
          },
          '& .MuiSlider-valueLabel': {
            borderRadius: '10px',
            fontSize: 12,
            padding: '4px 8px',
            backgroundColor: 'rgba(0,0,0,0.9)',
            color: '#fff',
            whiteSpace: 'nowrap' // Giữ text trên cùng 1 dòng
          },
          '& .MuiSlider-track, & .MuiSlider-rail': { borderRadius: 999 }
        }}
        getAriaLabel={(i) => (i === 0 ? 'Giá tối thiểu' : 'Giá tối đa')}
        getAriaValueText={formatTrieuOrTy}
      />

      <div className='mt-2 text-sm text-zinc-600'>
        Khoảng giá: <span className='font-medium'>{formatVND(value[0])}</span> —{' '}
        <span className='font-medium'>{formatVND(value[1])}</span>
      </div>

      <div className='mt-3 flex justify-end'>
        <Button
          variant='outlined'
          onClick={handleApply}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '9999px',
            px: 2.5,
            py: 0.75,
            borderColor: '#111827',
            color: '#111827',
            '&:hover': { borderColor: '#111827', backgroundColor: 'rgba(0,0,0,0.06)' }
          }}
        >
          Áp dụng
        </Button>
      </div>
    </div>
  )
}
