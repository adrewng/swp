import { useQuery } from '@tanstack/react-query'
import { isUndefined, omitBy } from 'lodash'
import postApi from '~/apis/post.api'
import useQueryParam from '~/hooks/useQueryParam'
import type { PostListTypeConfig } from '~/types/admin/post.type'
import PostFilters from './components/PostFilters'
import PostStats from './components/PostStats'
import PostTable from './components/PostTable'

export type QueryConfig = {
  [key in keyof PostListTypeConfig]: string
}

export default function PostManagement() {
  const queryParams: QueryConfig = useQueryParam()

  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || 1,
      limit: queryParams.limit,
      search: queryParams.search,
      year: queryParams.year,
      status: queryParams.status,
      priority: queryParams.priority
    },
    isUndefined
  )

  const { data, isLoading } = useQuery({
    queryKey: ['posts', queryConfig],
    queryFn: () => postApi.getPostsByAdmin(queryConfig as PostListTypeConfig)
  })

  if (isLoading)
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='flex space-x-2'>
          <span className='w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]'></span>
          <span className='w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]'></span>
          <span className='w-3 h-3 bg-blue-500 rounded-full animate-bounce'></span>
        </div>
      </div>
    )

  return (
    <div className='p-6 space-y-6 flex-1 overflow-y-auto'>
      <PostStats />
      <PostFilters queryConfig={queryConfig} />
      <PostTable data={data} queryConfig={queryConfig} />
    </div>
  )
}
