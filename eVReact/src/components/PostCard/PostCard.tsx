import { FaCog, FaHeart, FaUsers } from 'react-icons/fa'
import type { PostType } from '~/types/post.type'
import { formatCurrency } from '~/utils/util'

interface PropType {
  post: PostType
}
export default function PostCard({ post }: PropType) {
  return (
    <>
      <div className='aspect-[4/3] w-full overflow-hidden bg-zinc-100'>
        <img
          src={post.product.image}
          alt={post.product.model}
          className='size-full object-cover transition-transform duration-300'
        />
      </div>

      {/* Content */}
      <div className='flex flex-col flex-1'>
        <div className='flex items-start justify-between p-4'>
          <div>
            <div className='font-semibold truncate leading-tight'>{post.title}</div>
            <div className='text-sm truncate text-zinc-600'>{post.product.address}</div>
          </div>
          <div className='rounded-full p-2 text-zinc-500 hover:bg-zinc-100 cursor-pointer' aria-label='Save'>
            <FaHeart />
          </div>
        </div>

        <div className='mt-auto flex items-center justify-between p-4'>
          <div className='flex items-center gap-4 text-sm text-zinc-700'>
            <div className='inline-flex items-center gap-1'>
              <FaUsers /> {post.product.year}
            </div>
            <div className='inline-flex items-center gap-1'>
              <FaCog /> {post.product.category.typeSlug}
            </div>
          </div>
          <div className='font-semibold'>{formatCurrency(Number(post.product.price))}</div>
        </div>
      </div>
    </>
  )
}
