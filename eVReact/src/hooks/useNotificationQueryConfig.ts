import { isUndefined, omitBy } from 'lodash'

import type { NotificationListConfig } from '~/types/notification.type'
import useQueryParam from './useQueryParam'

export type NotificationQueryConfig = {
  [key in keyof NotificationListConfig]: string
}
export default function useNotificationQueryConfig() {
  const queryParam: NotificationQueryConfig = useQueryParam()
  const queryConfig: NotificationQueryConfig = omitBy(
    {
      page: queryParam.page || '1',
      limit: queryParam.limit || '10',
      isRead: queryParam.isRead
    },
    isUndefined
  )
  return queryConfig
}
