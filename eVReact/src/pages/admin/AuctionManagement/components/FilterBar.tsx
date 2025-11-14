''

import { Search } from 'lucide-react'

interface FilterBarProps {
  filters: {
    status: string
    search: string
    sortBy: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFilters: (filters: any) => void
}

export default function FilterBar({ filters, setFilters }: FilterBarProps) {
  return (
    <div className='flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between'>
      {/* Search */}
      <div className='relative flex-1'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
        <input
          type='text'
          placeholder='Tìm kiếm phiên đấu giá...'
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className='w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-500 transition focus:border-slate-300 focus:bg-white focus:outline-none'
        />
      </div>

      {/* Filters */}
      <div className='flex gap-3'>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className='rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition focus:border-slate-300 focus:outline-none'
        >
          <option value='all'>Tất Cả Trạng Thái</option>
          <option value='active'>Đang Diễn Ra</option>
          <option value='upcoming'>Sắp Bắt Đầu</option>
          <option value='ended'>Đã Kết Thúc</option>
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          className='rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition focus:border-slate-300 focus:outline-none'
        >
          <option value='recent'>Gần Đây Nhất</option>
          <option value='price-high'>Giá Cao Nhất</option>
          <option value='price-low'>Giá Thấp Nhất</option>
          <option value='bids'>Lượt Đấu Giá</option>
        </select>
      </div>
    </div>
  )
}
