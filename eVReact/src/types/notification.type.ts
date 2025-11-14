import type { NotificationType } from '~/constants/notification'

export interface Notification {
  id: number
  type: NotificationType
  title: string
  message: string
  postTitle?: string
  createdAt: string
  isRead: boolean
}

export interface NotificationList {
  notifications: Notification[]
  static: {
    allCount: number
    totalCount: number
    unreadCount: number
  }
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface NotificationListConfig {
  page?: number | string
  limit?: number | string
  isRead?: 1 | 0
}
export interface NavNotificationsData {
  items: Notification[]
  allCount: number
  unreadCount: number
  isLoading: boolean
  isFetching: boolean
}
