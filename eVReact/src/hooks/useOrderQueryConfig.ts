import { isUndefined, omitBy } from 'lodash'

import type { OrderListConfig } from '~/types/order.type'
import useQueryParam from './useQueryParam'

export type OrderQueryConfig = {
  [key in keyof OrderListConfig]: string
}
export default function useOrderQueryConfig() {
  const queryParam: OrderQueryConfig = useQueryParam()
  const queryConfig: OrderQueryConfig = omitBy(
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
