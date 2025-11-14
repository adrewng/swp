import { useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { BadgeCheck, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import postApi from '~/apis/post.api'
import { path } from '~/constants/path'
import { CategoryType } from '~/types/category.type'
import type { RelatedPost } from '~/types/post.type'
import { formatCurrencyVND, formatUTCDateString, generateNameId, getTimeAgo } from '~/utils/util'

export default function RelatedCard({ item }: { item: RelatedPost }) {
  const to = `${path.post}/${generateNameId({ name: item.title, id: item.id })}`
  const price = formatCurrencyVND(item.price)
  const qc = useQueryClient()
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }} className='h-full'>
      <Link
        to={to}
        className='block h-full'
        onMouseEnter={() => {
          qc.prefetchQuery({
            queryKey: ['product', String(item.id)],
            queryFn: () => postApi.getProductDetail(String(item.id)),
            staleTime: 5 * 60 * 1000,
            gcTime: 5 * 60 * 1000
          })
        }}
      >
        <article className='group h-full overflow-hidden rounded-2xl border border-zinc-100 bg-white/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70 transition-shadow hover:shadow-md flex flex-col'>
          {/* Image */}
          <div className='relative aspect-[4/3] w-full overflow-hidden'>
            <img
              src={item.image}
              alt={item.title}
              loading='lazy'
              className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
            />
            {/* similarity */}
            {/* <div className='absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[11px] font-medium text-white'>
              <Zap className='h-3.5 w-3.5' />
              {item.similarity_score}% trùng khớp
            </div> */}
          </div>

          {/* Body */}
          <div className='flex flex-1 flex-col gap-2 p-4'>
            <h3 className='line-clamp-2 text-base font-semibold leading-tight text-zinc-900 truncate'>{item.title}</h3>

            <div className='text-lg font-semibold text-emerald-600'>{price}</div>

            <div className='grid grid-cols-3 gap-x-1.5 gap-y-1.5'>
              <span className='w-fit justify-self-start rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] text-zinc-700'>
                {item.brand}
              </span>
              <span className='w-fit justify-self-start rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] text-zinc-700'>
                {item.model}
              </span>
              <span className='w-fit justify-self-start rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] text-zinc-700'>
                {item.year}
              </span>
              <span className='w-fit justify-self-start rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] text-indigo-700'>
                {item.category_type === CategoryType.vehicle ? 'Xe' : 'Pin'}
              </span>
            </div>

            <div className='mt-1 flex items-center gap-1.5 text-xs text-zinc-600'>
              <MapPin className='h-3.5 w-3.5' />
              <span className='truncate'>{item.address}</span>
            </div>

            {/* Footer (đẩy xuống cuối, có đường kẻ để thẳng hàng) */}
            <div className='mt-auto space-y-2 pt-2'>
              <div className='flex items-center justify-between border-t border-zinc-100 pt-2'>
                <div className='flex items-center gap-1 text-[12px] text-zinc-600'>
                  <BadgeCheck className='h-3.5 w-3.5 text-emerald-500' />
                  {item.status === 'approved' ? 'Đã duyệt' : item.status}
                </div>
              </div>

              <div className='text-[11px] text-zinc-400'>{getTimeAgo(formatUTCDateString(item.created_at))}</div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
