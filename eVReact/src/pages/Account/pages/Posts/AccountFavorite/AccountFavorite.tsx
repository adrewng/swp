/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/AccountFavorite/AccountFavorite.tsx
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Eye, HeartCrack, MapPin, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import postApi from '~/apis/post.api'
import { path } from '~/constants/path'
import { statusTone } from '~/constants/post'
import useQueryConfig from '~/hooks/useQueryConfig'
import type { ProductListConfig } from '~/types/post.type'
import { formatCurrencyVND, formatUTCDateString, generateNameId, getTimeAgo, isVehicle } from '~/utils/util'
import Pagination from '../../AccountOrders/components/Pagination'

export default function AccountFavorite() {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const qc = useQueryClient()
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['favorite-posts'],
    queryFn: () => postApi.getFavoritePostByUser({ page: 1, limit: 10 } as ProductListConfig),
    staleTime: 30_000,
    refetchOnWindowFocus: false
  })

  const deleteFavoriteMutation = useMutation({
    mutationKey: ['delete-favorite'],
    mutationFn: (id: number | string) => postApi.deleteFavoritePost(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['favorite-posts'] })
    }
  })

  const handleDeleteFavorite = (id: number | string) => {
    deleteFavoriteMutation.mutate(id)
  }

  const list = data?.data.data.posts ?? []
  const total = data?.data.data.count?.all ?? 0

  return (
    <div className='flex-1 bg-white min-h-screen p-8 text-gray-900'>
      <div className='mb-6'>
        <h1 className='text-4xl font-bold'>Tin yêu thích</h1>
        <p className='text-gray-600 mt-1'>Quản lý danh sách bài đăng bạn đã thêm vào mục yêu thích</p>
      </div>

      {/* Bộ đếm + nút phụ (tuỳ ý) */}
      <div className='flex items-center justify-between mb-4'>
        <div className='text-sm text-gray-600'>
          Tổng: <b>{total}</b>
          {isFetching && <span className='ml-2 text-xs text-gray-400'>(đang tải lại…)</span>}
        </div>
      </div>

      {/* Trạng thái tải */}
      {isLoading ? (
        <div className='py-16 text-center text-gray-600'>Đang tải dữ liệu…</div>
      ) : list.length === 0 ? (
        <div className='py-16 text-center border rounded-xl'>
          <HeartCrack className='w-10 h-10 mx-auto mb-2 text-gray-400' />
          <div className='text-gray-700 font-medium mb-1'>Chưa có tin yêu thích</div>
          <div className='text-gray-400 text-sm'>Hãy thêm các bài đăng bạn quan tâm để theo dõi nhanh hơn.</div>
        </div>
      ) : (
        <div className='space-y-5'>
          {list.map((p) => {
            const product = p.product
            const _isVehicle = isVehicle(product as any)
            const price = formatCurrencyVND(product.price)
            const stKey = (p.status as keyof typeof statusTone) ?? 'approved'
            const st = statusTone[stKey] ?? statusTone.approved
            const href = `${path.post}/${generateNameId({ name: p.title, id: p.id })}`
            const canGo = p.status === 'approved' || p.status === 'auctioning'
            return (
              <div key={p.id} className='flex gap-4 border rounded-2xl p-4 hover:shadow-sm transition'>
                {/* Thumbnail */}
                <div className='relative flex-shrink-0 size-36 rounded-xl overflow-hidden ring-1 ring-gray-200 bg-gray-100'>
                  <img src={product.image} alt={p.title} className='size-full object-cover' loading='lazy' />
                  <div className='absolute top-2 left-2'>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] ring-1 ${st.cls}`}
                    >
                      <span className='inline-block w-1.5 h-1.5 rounded-full bg-current/60' />
                      {st.text}
                    </span>
                  </div>
                  <span className='absolute bottom-2 left-2 text-[11px] px-2 py-0.5 rounded-full bg-black/70 text-white'>
                    {_isVehicle ? 'Xe' : 'Pin'}
                  </span>
                </div>

                {/* Nội dung */}
                <div className='flex-1 min-w-0'>
                  <div className='flex items-start justify-between gap-3'>
                    <h3 className='text-lg font-semibold text-gray-900 line-clamp-1'>{p.title}</h3>

                    {/* Actions nhỏ */}
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={(e) => {
                          if (canGo) {
                            navigate(href)
                          } else {
                            e.stopPropagation()
                            //TODO Gọi hàm delete favorite post ở đây lun
                            handleDeleteFavorite(p.id)
                          }
                        }}
                        className='inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-black text-white text-xs hover:bg-black/85'
                        title='Xem chi tiết'
                        disabled={!canGo}
                        aria-disabled={!canGo}
                      >
                        <Eye size={14} />
                        Xem
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteFavorite(p.id)
                        }}
                        className='inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs hover:bg-gray-50'
                        title='Bỏ yêu thích'
                      >
                        <Trash2 size={14} />
                        Xóa
                      </button>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className='mt-1 text-emerald-600 font-bold'>{price}</div>

                  <div className='mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600'>
                    <span className='inline-flex items-center gap-1'>
                      <MapPin size={14} /> {product.address}
                    </span>
                  </div>

                  {p.favorite_at && (
                    <div className='mt-2 text-xs text-gray-400'>
                      Đã lưu {getTimeAgo(formatUTCDateString(p.favorite_at))}
                    </div>
                  )}

                  {/* Người bán (nếu có) */}
                  {p.seller && (
                    <div className='mt-2 text-xs text-gray-500'>
                      Người bán: <b>{p.seller.full_name}</b> — {p.seller.phone}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
          <Pagination queryConfig={queryConfig} pageSize={data?.data.data.pagination.page_size ?? 1} />
        </div>
      )}
    </div>
  )
}
