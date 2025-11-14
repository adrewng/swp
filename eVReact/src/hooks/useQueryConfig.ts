import { isUndefined, omitBy } from 'lodash'
import type { ProductListConfig } from '~/types/post.type'
import useQueryParam from './useQueryParam'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
export default function useQueryConfig() {
  const queryParam: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParam.page || '1',
      limit: queryParam.limit || '12',
      sort_by: queryParam.sort_by,
      title: queryParam.title,
      order: queryParam.order,
      price_max: queryParam.price_max,
      price_min: queryParam.price_min,
      power: queryParam.power,
      mileage: queryParam.mileage,
      seat: queryParam.seat,
      health: queryParam.health,
      voltage: queryParam.voltage,
      capacity: queryParam.capacity,
      category_id: queryParam.category_id,
      category_type: queryParam.category_type,
      color: queryParam.color,
      warranty: queryParam.warranty,
      status: queryParam.status
    },
    isUndefined
  )
  return queryConfig
}
