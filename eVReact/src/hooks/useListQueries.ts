import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import categoryApi from '~/apis/categories.api'
import postApi from '~/apis/post.api'
import { CategoryType } from '~/types/category.type'
import type { ProductListConfig } from '~/types/post.type'
import type { QueryConfig } from './useQueryConfig'
import useQueryConfig from './useQueryConfig'

const STALE_TIME = 3 * 60 * 1000

type Props = { categoryType: CategoryType }

export function useListQueries({ categoryType }: Props) {
  const rawQueryConfig = useQueryConfig()
  const isAll = categoryType === CategoryType.all
  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getCategories,
    staleTime: STALE_TIME
  })

  // slug của type hoặc '' nếu không tìm thấy
  const categorySlug = useMemo(() => {
    if (isAll) return CategoryType.all
    return categories.data?.data?.data.find((c) => c.slug === categoryType)?.slug ?? CategoryType.notFound
  }, [isAll, categories.data?.data?.data, categoryType])

  const queryConfig = useMemo<QueryConfig>(() => {
    const base: QueryConfig = { ...rawQueryConfig }
    if (isAll) {
      //Nếu là all thì xóa category_type vì không chuyền thì sẽ không lọc theo type
      delete (base as QueryConfig).category_type
      return base
    } else {
      //Nếu khác all thì chuyền category_type
      return { ...base, category_type: categorySlug }
    }
  }, [rawQueryConfig, isAll, categorySlug])

  const keyPart = isAll //
    ? 'all' //
    : categorySlug
      ? `${categorySlug}`
      : //Lỡ trường hợp notFound do chưa call xong hay không tìm được id thì trả về pending
        'pending'

  const posts = useQuery({
    queryKey: ['posts', keyPart, queryConfig],
    queryFn: () => postApi.getPosts(queryConfig as ProductListConfig),
    staleTime: STALE_TIME,
    placeholderData: keepPreviousData,
    enabled: isAll || !!categorySlug // Nếu là all hoặc categorySlug thì mới call api
  })

  return {
    categorySlug: categorySlug as CategoryType,
    queryConfig: queryConfig as QueryConfig,
    categoriesData: categories,
    postsData: posts
  }
}
