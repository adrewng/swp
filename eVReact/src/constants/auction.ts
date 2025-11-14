import type { SessionStatus } from '~/types/auction.type'

export const SESSION_STATUS_LABEL: Record<SessionStatus, string> = {
  draft: 'Nháp',
  verified: 'Đã kiểm duyệt',
  live: 'Đang diễn ra',
  ended: 'Kết thúc',
  cancelled: 'Hủy'
}

export const SESSION_STATUS_CLASS: Record<SessionStatus, string> = {
  draft: 'bg-gray-100 text-gray-700 ring-gray-200',
  verified: 'bg-sky-100 text-sky-700 ring-sky-200',
  live: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  ended: 'bg-indigo-100 text-indigo-700 ring-indigo-200',
  cancelled: 'bg-rose-100 text-rose-700 ring-rose-200'
}
