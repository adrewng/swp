import type { NotificationList, NotificationListConfig } from '~/types/notification.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const URL_GET_NOTIFICAION = 'api/notification/notifications'
const URL_READ_A_NOTIFICAION = 'api/notification/mark-as-read'
const URL_READ_ALL_NOTIFICAION = 'api/notification/mark-all-as-read'
const URL_DELETE_NOTIFICAION = 'api/notification/delete'

const notificationApi = {
  // async getNotificationByUser(config: NotificationListConfig = {}): Promise<SuccessResponse<NotificationList>> {
  //   const page = toInt(config.page, 1)
  //   const limit = toInt(config.limit, 10)
  //   const isReadFilter = config.isRead // boolean | undefined

  //   // 1) sắp xếp mới → cũ
  //   const ordered = [...mockNotifications].sort(
  //     (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //   )

  //   // 2) lọc theo isRead (undefined = all)
  //   const filtered = typeof isReadFilter === 'boolean' ? ordered.filter((n) => n.isRead === isReadFilter) : ordered

  //   // 3) phân trang
  //   const start = (page - 1) * limit
  //   const end = start + limit
  //   const pageItems = filtered.slice(start, end)

  //   // 4) static (tính trên toàn bộ dataset gốc)
  //   const allCount = mockNotifications.length
  //   const unrendCount = mockNotifications.filter((n) => !n.isRead).length

  //   const payload: SuccessResponse<NotificationList> = {
  //     message: 'OK',
  //     data: {
  //       notifications: pageItems,
  //       static: {
  //         allCount,
  //         unrendCount
  //       },
  //       pagination: {
  //         page,
  //         limit,
  //         page_size: pageItems.length
  //       }
  //     }
  //   }

  //   // mô phỏng độ trễ
  //   await new Promise((r) => setTimeout(r, 400))
  //   return payload
  // }
  getNotificationByUser(config: NotificationListConfig) {
    return http.get<SuccessResponse<NotificationList>>(URL_GET_NOTIFICAION, { params: config })
  },
  readANotification(id: number | string) {
    return http.put(URL_READ_A_NOTIFICAION, {
      id
    })
  },
  readAllNotification() {
    return http.put(URL_READ_ALL_NOTIFICAION)
  },
  deleteNotification(id: string | number) {
    return http.delete(URL_DELETE_NOTIFICAION, {
      data: {
        id
      }
    })
  }
}

// const mockNotifications: Notification[] = [
//   {
//     id: 1,
//     type: 'post_approved',
//     title: 'Bài đăng được duyệt',
//     message: 'Bài đăng "VinFast VF3 2024" đã được duyệt và hiển thị công khai.',
//     postTitle: 'VinFast VF3 2024',
//     createdAt: '2025-10-26T09:15:00',
//     isRead: false
//   },
//   {
//     id: 2,
//     type: 'post_rejected',
//     title: 'Bài đăng bị từ chối',
//     message: 'Bài đăng "Xe đạp điện MTB" bị từ chối: Hình ảnh mờ, vui lòng cập nhật.',
//     postTitle: 'Xe đạp điện MTB',
//     createdAt: '2025-10-26T08:30:00',
//     isRead: true
//   },
//   {
//     id: 3,
//     type: 'post_resubmitted',
//     title: 'Bài viết đã bị từ chối lần đầu',
//     message: 'Bạn hãy cập nhật và gữi lại bài "Pin LFP 60V" để xét duyệt.',
//     postTitle: 'Pin LFP 60V',
//     createdAt: '2025-10-26T10:05:00',
//     isRead: false
//   },
//   {
//     id: 4,
//     type: 'post_sold',
//     title: 'Đã bán thành công',
//     message: 'Chúc mừng! Bài đăng "Gogoro S2" đã được bán.',
//     postTitle: 'Gogoro S2',
//     createdAt: '2025-10-25T17:40:00',
//     isRead: true
//   },
//   {
//     id: 5,
//     type: 'post_deleted',
//     title: 'Bài đăng đã xóa',
//     message: 'Bạn đã xóa bài đăng "DatBike E" khỏi hệ thống.',
//     postTitle: 'DatBike E',
//     createdAt: '2025-10-25T12:10:00',
//     isRead: true
//   },
//   {
//     id: 6,
//     type: 'post_auctioning',
//     title: 'Bắt đầu đấu giá',
//     message: 'Bài đăng "Pin 72V 30Ah" đã mở phiên đấu giá.',
//     postTitle: 'Pin 72V 30Ah',
//     createdAt: '2025-10-26T11:00:00',
//     isRead: false
//   },
//   {
//     id: 7,
//     type: 'post_auctioned',
//     title: 'Đấu giá kết thúc',
//     message: 'Phiên đấu giá "Scooter điện X9" đã kết thúc.',
//     postTitle: 'Scooter điện X9',
//     createdAt: '2025-10-24T19:00:00',
//     isRead: true
//   },
//   {
//     id: 8,
//     type: 'auction_verified',
//     title: 'Tham gia đấu giá được duyệt',
//     message: 'Yêu cầu tham gia "Pin CATL 48V" đã được chấp thuận.',
//     postTitle: 'Pin CATL 48V',
//     createdAt: '2025-10-26T07:50:00',
//     isRead: true
//   },
//   {
//     id: 9,
//     type: 'auction_rejected',
//     title: 'Tham gia đấu giá bị từ chối',
//     message: 'Yêu cầu tham gia "Ebike Roadster" bị từ chối: Thiếu đặt cọc.',
//     postTitle: 'Ebike Roadster',
//     createdAt: '2025-10-23T16:05:00',
//     isRead: true
//   },
//   {
//     id: 10,
//     type: 'package_success',
//     title: 'Mua gói thành công',
//     message: 'Bạn đã mua gói PRO (30 ngày).',
//     createdAt: '2025-10-26T09:35:00',
//     isRead: false
//   },
//   {
//     id: 11,
//     type: 'topup_success',
//     title: 'Nạp tiền thành công',
//     message: 'Bạn đã nạp 500.000₫ vào ví.',
//     createdAt: '2025-10-26T09:20:00',
//     isRead: false
//   },
//   {
//     id: 12,
//     type: 'deposit_success',
//     title: 'Đặt cọc thành công',
//     message: 'Bạn đã đặt cọc 1.000.000₫ cho "VinFast Klara".',
//     postTitle: 'VinFast Klara',
//     createdAt: '2025-10-26T10:25:00',
//     isRead: false
//   },
//   {
//     id: 13,
//     type: 'deposit_win',
//     title: 'Bạn đã thắng đấu giá',
//     message: 'Chúc mừng! Bạn thắng đấu giá "Pedelec Touring".',
//     postTitle: 'Pedelec Touring',
//     createdAt: '2025-10-24T20:10:00',
//     isRead: true
//   },
//   {
//     id: 14,
//     type: 'deposit_fail',
//     title: 'Không trúng đấu giá',
//     message: 'Bạn không trúng đấu giá "Pin NMC 60V". Cọc 500.000₫ sẽ được hoàn trong 1–3 ngày.',
//     postTitle: 'Pin NMC 60V',
//     createdAt: '2025-10-24T20:05:00',
//     isRead: true
//   },
//   {
//     id: 15,
//     type: 'message',
//     title: 'Tin nhắn mới',
//     message: 'Người mua hỏi: “Xe còn bảo hành pin bao lâu?”',
//     postTitle: 'YADEA ULike',
//     createdAt: '2025-10-26T11:25:00',
//     isRead: false
//   },
//   {
//     id: 16,
//     type: 'system',
//     title: 'Cập nhật hệ thống',
//     message: 'Nâng cấp hiệu năng trang danh sách + thêm bộ lọc dung lượng pin.',
//     createdAt: '2025-10-22T09:00:00',
//     isRead: true
//   }
// ]
export default notificationApi
