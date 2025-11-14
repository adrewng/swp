import { useMutation, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { ClipboardList, CreditCard, MessageSquare, Receipt, RefreshCcw, Star, Undo2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import feedbackApi from '~/apis/feedback.api'
import paymentApi from '~/apis/payment.api'
import Button from '~/components/Button'
import { getOrderStatusLabel, ORDER_TYPE_LABEL, ORDERSTATUS } from '~/constants/order'
import { CategoryType } from '~/types/category.type'
import type { FeedbackType } from '~/types/feedback.type'
import type { Order } from '~/types/order.type'
import { fmtDate, formatCurrencyVND } from '~/utils/util'
import StatusPill from '../StatusPill'

const SHOP_NAME = 'Eviest'
const makeCode = (id: number) => `OD${String(id).padStart(6, '0')}`
type TrackingKey = keyof typeof ORDERSTATUS

export default function OrderCard({ o, onOpen }: { o: Order; onOpen: (o: Order) => void }) {
  const code = makeCode(o.id)
  const viewingTime = o.viewingAppointment?.time
  const handoverTime = o.handoverAppointment?.time

  //dành cho đánh giá
  const [showRating, setShowRating] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isRated, setIsRated] = useState(false)

  const createFeedback = useMutation({
    mutationFn: (formData: FeedbackType) => feedbackApi.createFeedback(formData),
    onSuccess: () => {
      toast.success('Đánh giá thành công! 🎉')
      setShowRating(false)
      setRating(0)
      setComment('')
      setIsRated(true)
    }
  })
  const handleFeedback = () => {
    const payload = {
      contract_id: o.contract?.id as number,
      seller_id: o.seller?.id ?? 0,
      buyer_id: o.buyer?.id ?? 0,
      rating,
      comment
    }
    createFeedback.mutate(payload)
  }
  const queryClient = useQueryClient()

  const repayPostMutation = useMutation({
    mutationFn: (orderId: number | string) => paymentApi.repayPost(orderId)
  })
  const handleRepayPost = (orderId: number | string) => {
    repayPostMutation.mutate(orderId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['order'] })
        toast.success('Thanh toán thành công!')
      }
    })
  }
  const tracking: TrackingKey = (o.tracking ?? 'PENDING') as TrackingKey

  return (
    <div className='rounded-2xl border border-gray-200 bg-white shadow-sm'>
      <div className='flex items-center justify-between gap-3 border-b border-gray-100 p-4'>
        <div className='flex items-center gap-2'>
          <div className='font-medium'>{SHOP_NAME}</div>
          <span className='mx-2 text-gray-300'>•</span>
          <div className='text-sm text-gray-500'>
            Mã: <span className='font-medium text-gray-800'>{code}</span>
          </div>
          <span className='mx-2 text-gray-300'>•</span>
          <span className='rounded-lg bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700'>
            {ORDER_TYPE_LABEL[o.type]}
          </span>
        </div>

        {/* Status pill theo tracking và type để tuỳ biến label */}
        <StatusPill status={tracking} type={o.type} />
      </div>

      <div className='p-4 text-sm'>
        <div className='flex flex-col gap-1 text-gray-600'>
          {(o.type === 'auction' || o.type === 'deposit') && (
            <div className='flex flex-col gap-0.5'>
              <div>
                <span className='text-gray-500'>Mã phiên đấu giá: </span>
                <span className='font-medium text-gray-800'>{o.auction?.id ?? '—'}</span>
              </div>
              <div>
                <span className='text-gray-500'>Giá khởi điểm: </span>
                <span className='font-medium text-gray-800'>{formatCurrencyVND(o.auction?.startingBid)}</span>
              </div>
              <div>
                <span className='text-gray-500'>Mã sản phẩm đấu giá: </span>
                <span className='font-medium text-gray-800'>{o.post?.product.id}</span>
              </div>
              <div>
                <span className='text-gray-500'>Giá mua ngay sản phẩm: </span>
                <span className='font-medium text-gray-800'>{formatCurrencyVND(o.auction?.buyNowPrice)}</span>
              </div>
              {o.type === 'auction' && (
                <div>
                  <span className='text-gray-500'>Ngày kiểm duyệt xe: </span>
                  <span className='font-medium'>
                    {fmtDate(viewingTime)} • {o.viewingAppointment?.address ?? '-'}
                  </span>
                </div>
              )}
              {handoverTime && o.buyer?.id === o.auction?.winner?.id && (
                <div>
                  <span className='text-gray-500'>Ngày giao dịch: </span>
                  <span className='font-medium'>
                    {fmtDate(handoverTime)} • {o.handoverAppointment?.address ?? '-'}
                  </span>
                </div>
              )}
            </div>
          )}

          {o.type === 'topup' && (
            <div className='flex flex-col gap-0.5'>
              <div>
                <span className='text-gray-500'>Nạp bao nhiêu: </span>
                <span className='font-medium text-gray-800'>{formatCurrencyVND(o.price)}</span>
              </div>
              <div>
                <span className='text-gray-500'>Phương thức nạp: </span>
                <span className='font-medium text-gray-800'>PayOS</span>
              </div>
            </div>
          )}

          {o.type === 'post' && (
            <div className='flex flex-col gap-0.5'>
              <div>
                <span className='text-gray-500'>Mã bài tin: </span>
                <span className='font-medium text-gray-800'>{o.post?.id}</span>
              </div>
              <div>
                <span className='text-gray-500'>Tiêu đề: </span>
                <span className='font-medium text-gray-800'>{o.post?.title}</span>
              </div>
              <div>
                <span className='text-gray-500'>Loại sản phẩm: </span>
                <span className='font-medium text-gray-800'>
                  {o.post?.product.category.typeSlug === CategoryType.vehicle ? 'Xe' : 'Pin'}
                </span>
              </div>
              <div>
                <span className='text-gray-500'>Giá sản phẩm: </span>
                <span className='font-medium text-gray-800'>{formatCurrencyVND(o.post?.product.price)}</span>
              </div>
            </div>
          )}

          {o.type === 'package' && (
            <div className='flex flex-col gap-0.5'>
              <div>
                <span className='text-gray-500'>Tên gói: </span>
                <span className='font-medium text-gray-800'>{o.service?.name}</span>
              </div>
              <div>
                <span className='text-gray-500'>Quyền lợi: </span>
                <span className='font-medium text-gray-800'>{o.service?.feature}</span>
              </div>
              <div>
                <span className='text-gray-500'>Mô tả: </span>
                <span className='font-medium text-gray-800'>{o.service?.description}</span>
              </div>
              <div>
                <span className='text-gray-500'>Giá sản phẩm: </span>
                <span className='font-medium text-gray-800'>{formatCurrencyVND(o.service?.price)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 p-4'>
        <div className='text-sm text-gray-600'>
          Trạng thái: <span className='font-medium text-gray-800'>{getOrderStatusLabel(tracking, o.type)}</span>
        </div>
        <div className='text-right'>
          <div className='text-xs text-gray-500'>Thành tiền</div>
          <div className='text-lg font-semibold'>{formatCurrencyVND(Number(o.price) || 0)}</div>
        </div>
      </div>

      <div className='flex flex-wrap items-center justify-end gap-2 p-4'>
        {/* Điều kiện nút dựa trên tracking */}
        {tracking === 'PENDING' && (
          <>
            {o.type === 'post' && (
              <Button
                onClick={() => {
                  handleRepayPost(o.id)
                }}
                disabled={repayPostMutation.isPending}
                isLoading={repayPostMutation.isPending}
                className='rounded-xl bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black'
              >
                <CreditCard className='mr-2 inline h-4 w-4' /> Thanh toán
              </Button>
            )}
          </>
        )}

        {o.type === 'auction' &&
          (tracking === 'PROCESSING' || tracking === 'VERIFYING' || tracking === 'AUCTION_PROCESSING') && (
            <>
              <button className='rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50'>
                <MessageSquare className='mr-2 inline h-4 w-4' /> Trao đổi lịch hẹn
              </button>
              <button className='rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50'>
                <ClipboardList className='mr-2 inline h-4 w-4' /> Xem báo giá
              </button>
              <button className='rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50'>
                <Undo2 className='mr-2 inline h-4 w-4' /> Hủy yêu cầu
              </button>
            </>
          )}

        {tracking === 'REFUND' && (
          <button className='rounded-2xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50'>
            <RefreshCcw className='mr-2 inline h-4 w-4' /> Theo dõi hoàn tiền
          </button>
        )}

        {/* Nút xem chi tiết */}
        <button
          onClick={() => onOpen(o)}
          className='rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50'
        >
          <Receipt className='mr-2 inline h-4 w-4' /> Chi tiết
        </button>
        {o.type === 'deposit' && (o.tracking === 'DEALING_SUCCESS' || o.tracking === 'DEALING_FAIL') && (
          <button
            onClick={() => setShowRating(!showRating)}
            className={`rounded-xl border border-gray-200 px-3 py-2 text-sm
      ${isRated ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'}
    `}
          >
            <MessageSquare className='mr-2 inline h-4 w-4' /> Đánh giá
          </button>
        )}
      </div>
      {showRating && (
        <div className='animate-fadeIn border-t border-gray-100 bg-gray-50 p-4'>
          <div className='mb-3 flex justify-center'>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={clsx(
                  'mx-1 h-7 w-7 cursor-pointer transition-colors',
                  (hoverRating || rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                )}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Nhập nhận xét của bạn...'
            className='w-full rounded-xl border border-gray-300 bg-white p-3 text-sm focus:border-gray-400 focus:outline-none'
            rows={3}
          />

          <div className='mt-3 flex justify-end gap-2'>
            <button
              onClick={() => setShowRating(false)}
              className='rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-100'
            >
              Hủy
            </button>
            <button
              onClick={handleFeedback}
              disabled={!rating}
              className={clsx(
                'rounded-xl px-4 py-2 text-sm font-medium text-white transition-colors',
                rating ? 'bg-gray-900 hover:bg-black' : 'bg-gray-400 cursor-not-allowed'
              )}
            >
              Gửi đánh giá
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
