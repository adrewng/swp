import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { omit } from 'lodash'
import { Bell, Check, Clock, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import notificationApi from '~/apis/notification.api'
import { notificationConfig, type ToneNotification } from '~/constants/notification'
import useNotificationQueryConfig from '~/hooks/useNotificationQueryConfig'
import type { NotificationListConfig } from '~/types/notification.type'
import { formatUTCDateString, getTimeAgo } from '~/utils/util'
import Pagination from '../AccountOrders/components/Pagination'

const toneTw: Record<ToneNotification, { border: string; bgUnread: string; icon: string }> = {
  success: { border: 'border-emerald-400', bgUnread: 'bg-emerald-50', icon: 'text-emerald-600' },
  info: { border: 'border-blue-400', bgUnread: 'bg-blue-50', icon: 'text-blue-600' },
  warning: { border: 'border-amber-400', bgUnread: 'bg-amber-50', icon: 'text-amber-600' },
  danger: { border: 'border-rose-400', bgUnread: 'bg-rose-50', icon: 'text-rose-600' }
}
export default function AccountNotification() {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all')
  const queryConfig = useNotificationQueryConfig()
  const navigate = useNavigate()
  const handleTypeReadClick = (key: 'all' | 'unread') => {
    setActiveTab(key)
    const search =
      key === 'all'
        ? createSearchParams(omit({ ...queryConfig, page: '1' }, ['isRead'])).toString()
        : createSearchParams({ ...queryConfig, isRead: '0', page: '1' }).toString()
    navigate({
      pathname: '',
      search: search
    })
  }

  const qc = useQueryClient()
  const readANotifictionMutation = useMutation({
    mutationKey: ['read-notification'],
    mutationFn: (id: number | string) => notificationApi.readANotification(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications'] })
    }
  })
  const readAllNotifictionMutation = useMutation({
    mutationKey: ['read-notifications'],
    mutationFn: () => notificationApi.readAllNotification(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications'] })
    }
  })
  const deleteNotificationMutation = useMutation({
    mutationKey: ['delete-notifications'],
    mutationFn: (id: number | string) => notificationApi.deleteNotification(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications'] })
    }
  })

  const { data: noticationData, isLoading } = useQuery({
    queryKey: ['notifications', queryConfig],
    queryFn: () => notificationApi.getNotificationByUser(queryConfig as NotificationListConfig),
    placeholderData: keepPreviousData
  })

  const notification = noticationData?.data.data.notifications || []

  const markAsRead = (id: number | string) => {
    readANotifictionMutation.mutate(id)
  }

  const markAllAsRead = () => {
    readAllNotifictionMutation.mutate()
  }

  const deleteNotification = (id: number) => {
    deleteNotificationMutation.mutate(id)
  }

  return (
    <div className='flex-1 bg-white min-h-screen p-8 text-gray-900'>
      {/* Header */}
      <div className='flex justify-between items-end border-b border-gray-200 pb-5'>
        <div>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>Thông báo</h1>
          <p className='text-gray-600'>Theo dõi cập nhật về bài đăng và hệ thống</p>
        </div>
        <div className='flex items-center gap-3'>
          <button
            onClick={markAllAsRead}
            disabled={isLoading || !noticationData || noticationData.data.data.static.unreadCount === 0}
            className='flex items-center gap-2 text-sm border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition disabled:opacity-50'
          >
            <Check size={14} /> Đánh dấu tất cả đã đọc
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex gap-3 mt-6'>
        <button
          onClick={() => handleTypeReadClick('all')}
          className={`px-4 py-2 text-sm font-medium rounded-md border transition ${
            activeTab === 'all' ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-50 text-gray-700'
          }`}
        >
          Tất cả ({noticationData?.data.data.static.totalCount ?? 0})
        </button>
        <button
          onClick={() => handleTypeReadClick('unread')}
          className={`px-4 py-2 text-sm font-medium rounded-md border transition ${
            activeTab === 'unread'
              ? 'bg-black text-white border-black'
              : 'border-gray-300 hover:bg-gray-50 text-gray-700'
          }`}
        >
          Chưa đọc ({noticationData?.data.data.static.unreadCount ?? 0})
        </button>
      </div>

      {/* List */}
      <div className='mt-6 space-y-3'>
        {isLoading ? (
          // Loading: render 6 skeleton (hoặc theo limit)
          Array.from({ length: Number(queryConfig.limit ?? 6) }).map((_, i) => (
            <div className='flex items-start gap-4 p-5 border border-gray-200 rounded-xl' key={i}>
              <div className='w-10 h-10 rounded-full border border-gray-200 bg-gray-100 animate-pulse' />
              <div className='flex-1 min-w-0 space-y-2'>
                <div className='h-4 w-40 bg-gray-100 rounded animate-pulse' />
                <div className='h-3 w-full bg-gray-100 rounded animate-pulse' />
                <div className='h-3 w-2/3 bg-gray-100 rounded animate-pulse' />
                <div className='h-3 w-24 bg-gray-100 rounded animate-pulse' />
              </div>
            </div>
          ))
        ) : notification.length === 0 ? (
          // Empty
          <div className='text-center py-20 border border-gray-200 rounded-lg'>
            <Bell className='w-10 h-10 text-gray-400 mx-auto mb-4' />
            <p className='text-gray-600 font-medium mb-1'>Không có thông báo</p>
            <p className='text-gray-400 text-sm'>Bạn đã cập nhật đầy đủ mọi thứ.</p>
          </div>
        ) : (
          notification.map((item) => {
            const { icon: Icon, tone } = notificationConfig[item.type]
            const toneClass = toneTw[tone]
            const containerClass = item.isRead
              ? 'border-gray-200 bg-white'
              : `${toneClass.border} ${toneClass.bgUnread}`

            return (
              <div
                key={item.id}
                className={`group flex items-start gap-4 p-5 border rounded-xl transition-all hover:shadow-sm ${containerClass}`}
              >
                {/* Icon */}
                <div className='flex-shrink-0'>
                  <div className='w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center'>
                    <Icon size={18} className={item.isRead ? 'text-gray-700' : toneClass.icon} />
                  </div>
                </div>

                {/* Text */}
                <div className='flex-1 min-w-0'>
                  <div className='flex justify-between'>
                    <h3 className='font-medium text-gray-900'>{item.title}</h3>
                    <div className='flex gap-2 opacity-0 group-hover:opacity-100 transition'>
                      {!item.isRead && (
                        <button
                          onClick={() => markAsRead(item.id)}
                          className='text-gray-500 hover:text-black transition'
                          title='Đánh dấu đã đọc'
                        >
                          <Check size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(item.id)}
                        className='text-gray-400 hover:text-black transition'
                        title='Xóa thông báo'
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className='text-sm text-gray-600 mt-1 leading-snug'>{item.message}</p>
                  {item.postTitle && <p className='text-xs text-gray-500 mt-1 italic'>Bài đăng: {item.postTitle}</p>}
                  <div className='flex items-center gap-1 text-xs text-gray-400 mt-2'>
                    <Clock size={12} /> {getTimeAgo(formatUTCDateString(item.createdAt))}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Pagination */}
      <Pagination pageSize={noticationData?.data.data.pagination?.page_size ?? 1} queryConfig={queryConfig} />
    </div>
  )
}
