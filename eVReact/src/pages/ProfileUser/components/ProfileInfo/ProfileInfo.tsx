import { ArrowLeftRight, CalendarDays, Mail, MapPin, Phone, Star } from 'lucide-react'
import type { User } from '~/types/user.type'
import { getJoinDuration } from '~/utils/util'

interface Prop {
  seller: User
}

export default function ProfileInfo({ seller }: Prop) {
  const duration = getJoinDuration(seller.createdAt ?? '')

  return (
    <div className='grid gap-6 lg:grid-cols-2'>
      {/* Contact Information */}
      <section className='rounded-2xl border border-neutral-200 bg-white p-6'>
        <h3 className='mb-6 text-lg font-semibold text-neutral-900'>Thông tin liên hệ</h3>

        <ul className='space-y-5'>
          {/* Email */}
          <li className='flex items-start gap-4'>
            <div className='rounded-full bg-neutral-100 p-3'>
              <Mail className='h-5 w-5 text-neutral-700' />
            </div>
            <div className='min-w-0'>
              <p className='text-sm font-medium text-neutral-500'>Email</p>
              <p className='mt-1 truncate font-medium text-neutral-900'>{seller.email ?? '-'}</p>
            </div>
          </li>

          {/* Phone */}
          <li className='flex items-start gap-4'>
            <div className='rounded-full bg-neutral-100 p-3'>
              <Phone className='h-5 w-5 text-neutral-700' />
            </div>
            <div>
              <p className='text-sm font-medium text-neutral-500'>Điện thoại</p>
              <p className='mt-1 font-medium text-neutral-900'>{seller.phone ?? '-'}</p>
            </div>
          </li>

          {/* Address */}
          <li className='flex items-start gap-4'>
            <div className='rounded-full bg-neutral-100 p-3'>
              <MapPin className='h-5 w-5 text-neutral-700' />
            </div>
            <div className='min-w-0'>
              <p className='text-sm font-medium text-neutral-500'>Địa chỉ</p>
              <p className='mt-1 truncate font-medium text-neutral-900'>{seller.address ?? '-'}</p>
            </div>
          </li>
        </ul>
      </section>

      {/* Business Stats */}
      <section className='rounded-2xl border border-neutral-200 bg-white p-6'>
        <h3 className='mb-6 text-lg font-semibold text-neutral-900'>Thống kê kinh doanh</h3>

        <div className='space-y-4'>
          {/* Join duration */}
          <Row
            icon={<CalendarDays className='h-4 w-4 text-neutral-700' />}
            label='Tham gia từ'
            value={duration ?? '-'}
          />
          {/* Total transactions */}
          <Row
            icon={<ArrowLeftRight className='h-4 w-4 text-neutral-700' />}
            label='Tổng giao dịch'
            value={seller.totalTransactions ?? 0}
          />
          {/* Rating */}
          <Row
            icon={<Star className='h-4 w-4 text-amber-500' />}
            label='Đánh giá'
            value={`${seller.rating ?? 0}/5.0`}
          />
        </div>
      </section>

      {/* Verification Status */}
      {/* <section className='rounded-2xl border border-neutral-200 bg-neutral-50 p-6 lg:col-span-2'>
        <h3 className='mb-6 text-lg font-semibold text-neutral-900'>Trạng thái xác minh</h3>

        <div className='grid gap-4 sm:grid-cols-3'>
          <VerifyCard
            title='Email'
            verified={Boolean(seller.email)}
            subText={seller.email ? 'Đã xác minh' : 'Chưa xác minh'}
          />

          <VerifyCard
            title='Số điện thoại'
            verified={Boolean(seller.isVerify && seller.phone)}
            subText={seller.isVerify && seller.phone ? 'Đã xác minh' : 'Chưa xác minh'}
          />
        </div>
      </section> */}
    </div>
  )
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className='flex items-center justify-between border-b border-neutral-100 py-3 last:border-b-0'>
      <div className='flex items-center gap-2 text-neutral-600'>
        {icon}
        <span className='text-sm'>{label}</span>
      </div>
      <span className='font-semibold text-neutral-900'>{value}</span>
    </div>
  )
}

// function VerifyCard({ title, verified, subText }: { title: string; verified: boolean; subText: string }) {
//   return (
//     <div className='flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4'>
//       {verified ? (
//         <BadgeCheck className='h-5 w-5 text-neutral-900' />
//       ) : (
//         <ShieldX className='h-5 w-5 text-neutral-500' />
//       )}
//       <div>
//         <p className='text-sm font-medium text-neutral-900'>{title}</p>
//         <p className={`text-xs ${verified ? 'text-neutral-600' : 'text-neutral-500'}`}>{subText}</p>
//       </div>
//     </div>
//   )
// }
