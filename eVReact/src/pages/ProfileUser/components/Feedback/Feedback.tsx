import { Star } from 'lucide-react'
import { useMemo } from 'react'
import Pagination from '~/components/Pagination'
import Rating from '~/components/Rating'
import type { OverviewQueryConfig } from '~/hooks/useOverviewQueryConfig'
import type { Feedback } from '~/types/feedback.type'
import type { User } from '~/types/user.type'
import { formatUTCDateString, getTimeAgo } from '~/utils/util'

interface Prop {
  feedbacks: Feedback[]
  seller: User
  pagination: { page?: number; limit?: number; page_size?: number }
  queryConfig: OverviewQueryConfig
}

export default function Feedback({ feedbacks, seller, pagination, queryConfig }: Prop) {
  // Tính phân bố sao 1..5 từ feedbacks
  const { total, counts } = useMemo(() => {
    const acc: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    for (const fb of feedbacks) {
      const s = Math.round(fb.start)
      if (s >= 1 && s <= 5) acc[s]++
    }
    return { total: feedbacks.length, counts: acc }
  }, [feedbacks])

  const pct = (count: number) => (total > 0 ? (count / total) * 100 : 0)

  return (
    <div className='space-y-8'>
      {/* Rating Overview */}
      <div className='rounded-2xl border border-neutral-200 bg-neutral-50 p-8'>
        <div className='grid gap-8 lg:grid-cols-2'>
          {/* Tổng quan điểm trung bình */}
          <div className='flex flex-col justify-center'>
            <div className='mb-4'>
              <div className='text-6xl font-bold text-neutral-900'>{(seller.rating ?? 0).toFixed(1)}</div>
              <Rating rating={seller.rating ?? 0} />
              <p className='mt-3 text-sm text-neutral-600'>
                Dựa trên <span className='font-semibold text-neutral-900'>{total}</span> đánh giá
              </p>
            </div>
          </div>

          <div className='space-y-3'>
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = counts[stars] ?? 0
              const percentage = Math.round(pct(count))
              return (
                <div key={stars} className='flex items-center gap-3'>
                  <div className='flex w-20 items-center gap-1'>
                    <span className='text-sm font-medium text-neutral-900'>{stars}</span>
                    <Star className='h-3.5 w-3.5 fill-amber-400 text-amber-400' />
                  </div>

                  <div className='h-2 flex-1 overflow-hidden rounded-full bg-neutral-200'>
                    <div
                      className='h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all'
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className='w-16 text-right text-sm font-medium text-neutral-600'>{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {feedbacks.length !== 0 && (
        <>
          <div className='space-y-4'>
            {feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className='rounded-2xl border border-neutral-200 bg-white p-6 transition hover:shadow-sm'
              >
                <div className='flex gap-4'>
                  <img
                    src={feedback.user.avatar || 'https://api.iconify.design/solar:user-bold.svg?color=%23999999'}
                    alt={feedback.user.full_name}
                    className='h-12 w-12 rounded-full bg-neutral-100 object-cover'
                  />

                  <div className='flex-1'>
                    <div className='flex items-start justify-between'>
                      <div>
                        <p className='font-semibold text-neutral-900'>{feedback.user.full_name}</p>
                        <Rating rating={feedback.start} />
                      </div>
                      <span className='text-xs text-neutral-500'>
                        {getTimeAgo(formatUTCDateString(feedback.createdAt))}
                      </span>
                    </div>
                    {/* <h4 className='mt-3 font-medium text-neutral-900'>{feedback.title}</h4> */}
                    <p className='mt-2 text-sm leading-relaxed text-neutral-600'>{feedback.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!!pagination && <Pagination pageSize={pagination.page_size ?? 1} queryConfig={queryConfig} />}
        </>
      )}
    </div>
  )
}
