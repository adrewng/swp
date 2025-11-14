import type { Order } from '~/types/order.type'
export type OrderType = 'post' | 'package' | 'topup' | 'auction' | 'deposit'

export type OrderStatus =
  | 'PENDING' // chờ thanh toán / chờ cọc
  | 'PROCESSING' // đã thanh toán & đang xử lý / đợi liên hệ
  | 'VERIFYING' // kiểm duyệt / kiểm định / nhận xe
  | 'SUCCESS' // hoàn tất
  | 'FAILED' // thất bại
  | 'CANCELLED' // đã huỷ
  | 'REFUND' // hoàn tiền (nếu có)
  | 'AUCTION_PROCESSING'
  | 'AUCTION_SUCCESS'
  | 'AUCTION_FAIL'
  | 'DEALING'
  | 'DEALING_SUCCESS'
  | 'DEALING_FAIL'

export const ORDERSTATUS: Record<OrderStatus, { label: string; className: string }> = {
  PENDING: { label: 'Chờ thanh toán', className: 'bg-amber-100 text-amber-700 ring-amber-200' },
  PROCESSING: { label: 'Đang xử lý', className: 'bg-sky-100 text-sky-700 ring-sky-200' },
  VERIFYING: { label: 'Đang kiểm duyệt', className: 'bg-indigo-100 text-indigo-700 ring-indigo-200' },
  SUCCESS: { label: 'Thành Công', className: 'bg-emerald-100 text-emerald-700 ring-emerald-200' },
  FAILED: { label: 'Thất bại', className: 'bg-rose-100 text-rose-700 ring-rose-200' },
  CANCELLED: { label: 'Đã huỷ', className: 'bg-zinc-100 text-zinc-700 ring-zinc-200' },
  REFUND: { label: 'Hoàn tiền', className: 'bg-gray-100 text-gray-700 ring-gray-200' },
  AUCTION_PROCESSING: { label: 'Đang tham gia', className: 'bg-blue-100 text-blue-700 ring-blue-200' },
  AUCTION_SUCCESS: { label: 'Đấu giá thành công', className: 'bg-emerald-100 text-emerald-700 ring-emerald-200' },
  AUCTION_FAIL: { label: 'Không có người thắng đấu giá', className: 'bg-rose-100 text-rose-700 ring-rose-200' },
  DEALING: { label: 'Đang giao dịch', className: 'bg-violet-100 text-violet-700 ring-violet-200' },
  DEALING_SUCCESS: { label: 'Giao dịch thành công', className: 'bg-emerald-100 text-emerald-700 ring-emerald-200' },
  DEALING_FAIL: { label: 'Giao dịch thất bại', className: 'bg-rose-100 text-rose-700 ring-rose-200' }
} as const

export const ORDER_TYPE_LABEL: Record<OrderType, string> = {
  post: 'Đăng tin',
  package: 'Gói',
  topup: 'Nạp ví',
  auction: 'Yêu cầu đấu giá',
  deposit: 'Đặt cọc đấu giá'
} as const
export function getOrderStatusLabel(status: OrderStatus, type?: Order['type']): string {
  if (status === 'AUCTION_PROCESSING') {
    if (type === 'auction') return 'Đang mở phiên'
    if (type === 'deposit') return 'Đang tham gia'
  }
  return ORDERSTATUS[status].label
}

type StepKey =
  | 'PENDING'
  | 'PROCESSING'
  | 'VERIFYING'
  | 'AUCTION_PROCESSING'
  | 'AUCTION_SUCCESS'
  | 'DEALING'
  | 'RESULT'
  | 'REFUND'

type Step = { key: StepKey; title: string }

const RESULT_STATUSES: ReadonlyArray<OrderStatus> = [
  'SUCCESS',
  'FAILED',
  'CANCELLED',
  'AUCTION_FAIL',
  'DEALING_SUCCESS',
  'DEALING_FAIL'
]

const ACTIVE_STEP_STATUSES: ReadonlyArray<StepKey> = [
  'PENDING',
  'PROCESSING',
  'VERIFYING',
  'AUCTION_PROCESSING',
  'AUCTION_SUCCESS',
  'DEALING',
  'REFUND'
]

export function getStepsByType(type?: Order['type'], status?: OrderStatus): Step[] {
  switch (type) {
    case 'topup':
      if (status === 'FAILED' || status === 'CANCELLED') {
        return [
          { key: 'PENDING', title: 'Chờ thanh toán' },
          { key: 'RESULT', title: 'Kết quả' }
        ]
      }
      return [
        { key: 'PENDING', title: 'Chờ thanh toán' },
        { key: 'PROCESSING', title: 'Đang xử lý' },
        { key: 'RESULT', title: 'Kết quả' }
      ]
    case 'post':
      if (status === 'FAILED' || status === 'CANCELLED') {
        return [
          { key: 'PENDING', title: 'Chuẩn bị & thanh toán' },
          { key: 'RESULT', title: 'Kết quả' }
        ]
      }
      return [
        { key: 'PENDING', title: 'Chuẩn bị & thanh toán' },
        { key: 'PROCESSING', title: 'Đang duyệt bài' },
        { key: 'RESULT', title: 'Kết quả' }
      ]
    case 'package':
      if (status === 'FAILED' || status === 'CANCELLED') {
        return [
          { key: 'PENDING', title: 'Chờ thanh toán' },
          { key: 'RESULT', title: 'Kết quả' }
        ]
      }
      return [
        { key: 'PENDING', title: 'Chờ thanh toán' },
        { key: 'PROCESSING', title: 'Kích hoạt gói' },
        { key: 'RESULT', title: 'Kết quả' }
      ]
    case 'auction':
      if (status === 'FAILED' || status === 'CANCELLED') {
        return [
          { key: 'PENDING', title: 'Thanh toán phí' },
          { key: 'RESULT', title: 'Kết quả' }
        ]
      }
      if (status === 'AUCTION_FAIL') {
        return [
          { key: 'PENDING', title: 'Thanh toán phí' },
          { key: 'VERIFYING', title: 'Kiểm duyệt/nhận xe' },
          { key: 'AUCTION_PROCESSING', title: 'Đang mở phiên đấu giá' },
          { key: 'RESULT', title: 'Kết quả' }
        ]
      }
      return [
        { key: 'PENDING', title: 'Thanh toán phí' },
        { key: 'VERIFYING', title: 'Kiểm duyệt/nhận xe' },
        { key: 'AUCTION_PROCESSING', title: 'Đang mở phiên đấu giá' },
        { key: 'AUCTION_SUCCESS', title: 'Có người thắng phiên và đợi giao dịch' },
        { key: 'DEALING', title: 'Giao dịch' },
        { key: 'RESULT', title: 'Kết quả' }
      ]

    case 'deposit':
      if (status === 'REFUND') {
        return [
          { key: 'PENDING', title: 'Thanh toán cọc' },
          { key: 'AUCTION_PROCESSING', title: 'Đang tham gia' },
          { key: 'RESULT', title: 'Kết quả' },
          { key: 'REFUND', title: 'Hoàn tiền' }
        ]
      }
      if (
        status === 'AUCTION_SUCCESS' ||
        status === 'DEALING' ||
        status === 'DEALING_SUCCESS' ||
        status === 'DEALING_FAIL' ||
        status === 'AUCTION_PROCESSING'
      ) {
        return [
          { key: 'PENDING', title: 'Thanh toán cọc' },
          { key: 'AUCTION_PROCESSING', title: 'Đang tham gia' },
          { key: 'AUCTION_SUCCESS', title: 'Thắng và đợi giao dịch' },
          { key: 'DEALING', title: 'Giao dịch' },
          { key: 'RESULT', title: 'Kết quả' }
        ]
      }
      return [
        { key: 'PENDING', title: 'Thanh toán cọc' },
        { key: 'RESULT', title: 'Kết quả' }
      ]
    default:
      return []
  }
}
export function mapStatusToStepKey(_type: Order['type'], status: OrderStatus): StepKey {
  if (_type === 'deposit' && status === 'AUCTION_SUCCESS') {
    return 'AUCTION_SUCCESS'
  }
  if (_type === 'auction' && status === 'AUCTION_SUCCESS') {
    return 'AUCTION_SUCCESS'
  }
  if (RESULT_STATUSES.includes(status)) {
    return 'RESULT'
  }
  if (ACTIVE_STEP_STATUSES.includes(status as StepKey)) {
    return status as StepKey
  }
  return 'RESULT'
}
