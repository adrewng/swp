import { CheckCircle, Clock } from 'lucide-react'
import type { PackageByMe } from '~/types/package.type'

export default function PackageCard({ pkg }: { pkg: PackageByMe }) {
  const statusConfig = {
    active: { label: 'Đang hoạt động', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    expired: { label: 'Hết hạn', color: 'text-gray-600 bg-gray-50 border-gray-200' }
  }

  const daysRemaining = Math.ceil((new Date(pkg.expires_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  return (
    <div
      className={`bg-white border-2 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 ${pkg.status === 'active' ? 'border-gray-900' : 'border-gray-200'}`}
    >
      <div className='flex items-start justify-between mb-4'>
        <div>
          <div className='flex items-center gap-2 mb-2'>
            <h3 className='text-xl font-bold text-gray-900'>{pkg.name}</h3>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusConfig[pkg.status as keyof typeof statusConfig].color}`}
            >
              {statusConfig[pkg.status as keyof typeof statusConfig].label}
            </span>
          </div>
          <p className='text-sm text-gray-600'>ID: {pkg.id}</p>
        </div>
        <div className='text-right'>
          <div className='text-2xl font-bold text-gray-900'> {Number(pkg.cost).toLocaleString('vi-VN')}</div>
          <div className='text-xs text-gray-600'>VND</div>
        </div>
      </div>

      <div className='space-y-2 mb-4'>
        {pkg.feature?.split(',').map((feature, index) => (
          <div key={index} className='flex items-center gap-2 text-sm text-gray-700'>
            <CheckCircle className='w-4 h-4 text-emerald-600 flex-shrink-0' />
            <span>{feature.trim()}</span>
          </div>
        ))}
      </div>

      <div className='pt-4 border-t border-gray-200'>
        <div className='flex items-center justify-between text-sm mb-2'>
          <span className='text-gray-600'>Ngày bắt đầu</span>
          <span className='font-medium text-gray-900'>{new Date(pkg.created_at).toLocaleDateString('vi-VN')}</span>
        </div>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-gray-600'>Ngày kết thúc</span>
          <span className='font-medium text-gray-900'>{new Date(pkg.expires_at).toLocaleDateString('vi-VN')}</span>
        </div>
        {/* Hiển thị số lần đăng tin còn lại */}
        <div className='flex items-center justify-between text-sm mb-2'>
          <span className='text-gray-600'>Số lần đăng tin còn lại</span>
          <span className='font-medium text-gray-900'>
            {pkg.remaining_amount} / {pkg.total_amount}
          </span>
        </div>
        {pkg.status === 'active' && daysRemaining > 0 && (
          <div className='mt-3 p-3 bg-gray-50 rounded-lg'>
            <div className='flex items-center justify-center gap-2 text-sm'>
              <Clock className='w-4 h-4 text-gray-600' />
              <span className='font-medium text-gray-900'>Còn lại {daysRemaining} ngày</span>
            </div>
          </div>
        )}
      </div>

      {/* {pkg.status === 'expired' && (
        <button className='w-full mt-4 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-all'>
          Renew Package
        </button>
      )} */}
    </div>
  )
}
