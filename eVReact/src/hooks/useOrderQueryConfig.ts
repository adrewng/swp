import { isUndefined, omitBy } from 'lodash'

import type { OrderListConfig } from '~/types/order.type'
import useQueryParam from './useQueryParam'

export type QueryConfig = {
  [key in keyof OrderListConfig]: string
}
export default function useOrderQueryConfig() {
  const queryParam: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParam.page || '1',
      limit: queryParam.limit || '10',
      type: queryParam.type || 'post',
      tracking: queryParam.tracking,
      orderId: queryParam.orderId
    },
    isUndefined
  )
  return queryConfig
}
