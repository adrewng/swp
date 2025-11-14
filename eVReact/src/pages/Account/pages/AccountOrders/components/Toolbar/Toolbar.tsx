import { Filter, Search } from 'lucide-react'

export default function Toolbar({ q, setQ }: { q: string; setQ: (s: string) => void }) {
  return (
    <div className='flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2'>
      <Search className='h-5 w-5 text-gray-400' />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder='Tìm theo mã đơn, tên dịch vụ/gói...'
        className='h-9 w-full bg-transparent text-sm outline-none'
      />
      <button className='hidden rounded-xl border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 md:block'>
        <Filter className='mr-2 inline h-4 w-4' />
        Bộ lọc
      </button>
    </div>
  )
}
