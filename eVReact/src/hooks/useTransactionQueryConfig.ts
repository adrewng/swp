import { isUndefined, omitBy } from 'lodash'

import type { TransactionConfig } from '~/types/transaction.type'
import useQueryParam from './useQueryParam'

export type TransactionQueryConfig = {
  [key in keyof TransactionConfig]: string
}
export default function useTransactionQueryConfig() {
  const queryParam: TransactionQueryConfig = useQueryParam()
  const queryConfig: TransactionQueryConfig = omitBy(
    {
      page: queryParam.page || '1',
      limit: queryParam.limit || '10'
    },
    isUndefined
  )
  return queryConfig
}
