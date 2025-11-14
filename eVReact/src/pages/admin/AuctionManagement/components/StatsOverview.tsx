''

import { Gavel, Users } from 'lucide-react'

interface PropsType {
  totalAuctions: number | undefined
  totalMembers: number | undefined
}
export default function StatsOverview(props: PropsType) {
  const { totalAuctions, totalMembers } = props
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2'>
      <div className='group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md'>
        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 transition-opacity group-hover:opacity-5`}
        />

        <div className='relative'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-slate-600'>Tổng Phiên Đấu Giá</p>
              <p className='mt-2 text-3xl font-bold text-slate-900'>{totalAuctions}</p>
            </div>
            <div className={`rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-3`}>
              <Gavel className='h-6 w-6 text-white' />
            </div>
          </div>
          {/* <p className='mt-4 text-xs font-semibold text-emerald-600'>+12% từ tháng trước</p> */}
        </div>
      </div>
      {/*  */}
      <div className='group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md'>
        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-0 transition-opacity group-hover:opacity-5`}
        />

        <div className='relative'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-slate-600'>Người Tham Gia</p>
              <p className='mt-2 text-3xl font-bold text-slate-900'>{totalMembers}</p>
            </div>
            <div className={`rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 p-3`}>
              <Users className='h-6 w-6 text-white' />
            </div>
          </div>
          {/* <p className='mt-4 text-xs font-semibold text-emerald-600'>+12% từ tháng trước</p> */}
        </div>
      </div>
    </div>
  )
}
