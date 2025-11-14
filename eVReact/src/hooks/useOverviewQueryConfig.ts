import { isUndefined, omitBy } from 'lodash'
import type { OverviewConfig } from '~/types/overview.type'
import useQueryParam from './useQueryParam'

export type OverviewQueryConfig = {
  [key in keyof OverviewConfig]: string
}

export default function useOverviewQueryConfig() {
  const queryParam: OverviewQueryConfig = useQueryParam()
  const queryConfig: OverviewQueryConfig = omitBy(
    {
      page: queryParam.page || '1',
      limit: queryParam.limit || '10',
      type: queryParam.type || 'feedback'
    },
    isUndefined
  )
  return queryConfig
}
