import type { PostType } from '~/types/post.type'

export const postStatus = {
  all: 'all',
  pending: 'pending',
  published: 'published',
  auctioning: 'auctioning',
  auctioned: 'auctioned',
  sold: 'sold',
  banned: 'banned'
} as const

export const tabs = [
  { id: 'all', label: 'Tất cả', param: 'status', statusQuery: 'all' },
  { id: 'pending', label: 'Đang chờ', param: 'status', statusQuery: 'pending' },
  { id: 'approved', label: 'Đã đăng', param: 'status', statusQuery: 'approved' },
  { id: 'rejected', label: 'Từ chối', param: 'status', statusQuery: 'rejected' },
  { id: 'auctioning', label: 'Đang đấu giá', param: 'status', statusQuery: 'auctioning' },
  { id: 'auctioned', label: 'Đã đấu gia', param: 'status', statusQuery: 'auctioned' },
  { id: 'sold', label: 'Đã bán', param: 'status', statusQuery: 'sold' },
  { id: 'banned', label: 'Đã cấm', param: 'status', statusQuery: 'banned' }
]

export const statusTone: Record<
  NonNullable<PostType['status']> | 'auctioning' | 'auctioned' | 'sold' | 'banned',
  { text: string; cls: string }
> = {
  pending: { text: 'Chờ duyệt', cls: 'bg-amber-50 text-amber-700 ring-amber-100' },
  approved: { text: 'Đang hiển thị', cls: 'bg-emerald-50 text-emerald-700 ring-emerald-100' },
  rejected: { text: 'Bị từ chối', cls: 'bg-rose-50 text-rose-700 ring-rose-100' },
  verifying: { text: 'Đang xác minh', cls: 'bg-blue-50 text-blue-700 ring-blue-100' },
  verified: { text: 'Đã xác minh', cls: 'bg-emerald-50 text-emerald-700 ring-emerald-100' },
  unverified: { text: 'Chưa xác minh', cls: 'bg-slate-50 text-slate-700 ring-slate-200' },
  auctioning: { text: 'Đang đấu giá', cls: 'bg-indigo-50 text-indigo-700 ring-indigo-100' },
  auctioned: { text: 'Đã đấu giá xong', cls: 'bg-slate-50 text-slate-700 ring-slate-200' },
  sold: { text: 'Đã bán', cls: 'bg-slate-50 text-slate-700 ring-slate-200' },
  banned: { text: 'Đã cấm', cls: 'bg-red-50 text-red-700 ring-red-100' }
}
