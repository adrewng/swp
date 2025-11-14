import { useNavigate } from 'react-router-dom'
import Pagination from '~/components/Pagination'
import { Button } from '~/components/ui/button'
import { path } from '~/constants/path'
import type { OverviewQueryConfig } from '~/hooks/useOverviewQueryConfig'
import type { PostOverView } from '~/types/post.type'
import { formatCurrencyVND, generateNameId } from '~/utils/util'

interface Prop {
  posts: PostOverView[]
  pagination: { page?: number; limit?: number; page_size?: number }
  queryConfig: OverviewQueryConfig
}

export default function ProfilePost({ posts, pagination, queryConfig }: Prop) {
  const navigate = useNavigate()
  return (
    <>
      {posts.length !== 0 && (
        <>
          {' '}
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {posts.map((post) => (
              <div
                key={post.id}
                className='group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:shadow-lg'
              >
                <div className='relative aspect-video overflow-hidden bg-neutral-100'>
                  <img
                    src={post.product.image}
                    alt={post.title}
                    className='h-full w-full object-cover transition duration-300 group-hover:scale-105'
                  />
                </div>
                <div className='p-5'>
                  <h3 className='font-semibold text-neutral-900'>{post.title}</h3>
                  <p className='mt-2 text-xl font-bold text-neutral-900'>{formatCurrencyVND(post.product.price)}</p>
                  <Button
                    onClick={() => {
                      navigate(`${path.post}/${generateNameId({ name: post.title, id: post.id })}`)
                    }}
                    className='mt-4 w-full rounded-full border border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white'
                    variant='outline'
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {!!pagination && <Pagination pageSize={pagination.page_size ?? 1} queryConfig={queryConfig} />}
        </>
      )}
    </>
  )
}
