import { CheckCircle2, ShieldCheck, Star, TrendingUp, Users } from 'lucide-react'
import Rating from '~/components/Rating'
import type { User } from '~/types/user.type'

interface Prop {
  profile: User
}

export default function ProfileCard({ profile }: Prop) {
  return (
    <div className='-mt-24 mb-12'>
      <div className='rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm'>
        <div className='flex flex-col gap-8 lg:flex-row lg:items-start'>
          {/* Avatar & Basic Info */}
          <div className='flex flex-col items-center lg:items-start'>
            <div className='relative'>
              <div className='h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-neutral-100 shadow-lg'>
                <img
                  src={profile.avatar || 'https://api.iconify.design/solar:user-bold.svg?color=%23999999'}
                  alt={profile.full_name || 'User avatar'}
                  className='h-full w-full object-cover'
                  loading='lazy'
                />
              </div>

              {profile.isVerify && (
                <div
                  className='absolute -bottom-2 -right-2 rounded-full bg-black p-2 shadow-lg'
                  title='Tài khoản đã xác minh'
                >
                  <ShieldCheck className='h-5 w-5 text-white' />
                </div>
              )}
            </div>

            <div className='mt-6 text-center lg:text-left'>
              <div className='flex items-center gap-2'>
                <h1 className='text-3xl font-bold tracking-tight text-neutral-900'>
                  {profile.full_name || 'Người dùng'}
                </h1>
              </div>

              {profile.isVerify && (
                <div className='mt-2 inline-flex items-center gap-1.5 rounded-full border border-neutral-900 bg-neutral-900 px-3 py-1 text-xs font-medium text-white'>
                  <CheckCircle2 className='h-3 w-3' />
                  Đã xác minh
                </div>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className='flex-1'>
            <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
              {/* Rating */}
              <div className='rounded-2xl border border-neutral-200 bg-neutral-50 p-4'>
                <div className='flex items-center gap-2 text-neutral-600'>
                  <Star className='h-4 w-4 text-amber-500' />
                  <span className='text-xs font-medium uppercase tracking-wide'>Đánh giá</span>
                </div>
                <div className='mt-2 flex items-baseline gap-2'>
                  <div className='text-2xl font-bold text-neutral-900'>{profile.rating}</div>
                  <span className='text-xs text-neutral-500'>/ 5.0</span>
                </div>
                <Rating rating={profile.rating ?? 0} />
              </div>

              {/* ĐÃ BÁN — INLINE JSX */}
              <div className='rounded-2xl border border-neutral-200 bg-neutral-50 p-4'>
                <div className='flex items-center gap-2 text-neutral-600'>
                  <TrendingUp className='h-4 w-4' />
                  <span className='text-xs font-medium uppercase tracking-wide'>Đã bán</span>
                </div>
                <div className='mt-2 text-2xl font-bold text-neutral-900'>{profile.totalSoldPosts}</div>
                <p className='text-xs text-neutral-500'>Hoàn thành</p>
              </div>

              {/* BÀI ĐĂNG — INLINE JSX */}
              <div className='rounded-2xl border border-neutral-200 bg-neutral-50 p-4'>
                <div className='flex items-center gap-2 text-neutral-600'>
                  <Users className='h-4 w-4' />
                  <span className='text-xs font-medium uppercase tracking-wide'>Bài đang hiển thị</span>
                </div>
                <div className='mt-2 text-2xl font-bold text-neutral-900'>{profile.totalActivePosts}</div>
                <p className='text-xs text-neutral-500'>Đang hoạt động</p>
              </div>
            </div>

            {/* Description */}
            {profile.description && (
              <div className='mt-6'>
                <p className='text-sm leading-relaxed text-neutral-600 line-clamp-4'>{profile.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
