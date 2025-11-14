import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { getStepsByType, mapStatusToStepKey, ORDERSTATUS, type OrderStatus } from '~/constants/order'
import type { Order } from '~/types/order.type'
import { fmtDate, formatCurrencyVND } from '~/utils/util'
import StepLine from '../StepLine'
import { ProductDetail, ServiceDetail } from './components/InfoBox/InfoBox'

const SYSTEM_SELLER = { name: 'Eviest', phone: '1900 123 456' }
const SYSTEM_SERVICE_TYPES: Order['type'][] = ['post', 'package', 'topup', 'auction']

export default function OrderDetail({
  open,
  onClose,
  order
}: {
  open: boolean
  onClose: () => void
  order: Order | null
}) {
  const steps = getStepsByType(order?.type, order?.tracking as OrderStatus)
  const activeKey = order && mapStatusToStepKey(order.type, order.tracking as OrderStatus)
  const activeIndex = Math.max(
    0,
    steps.findIndex((s) => s.key === activeKey)
  )
  const isSystemService = !!order && SYSTEM_SERVICE_TYPES.includes(order.type)

  return (
    <AnimatePresence>
      {open && order && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-50'
        >
          <div className='absolute inset-0 bg-black/20' onClick={onClose} />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0.1, duration: 0.45 }}
            className='absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto rounded-l-2xl bg-white p-6 shadow-2xl'
          >
            <div className='flex items-start justify-between'>
              <div>
                <div className='text-xs text-gray-500'>ĐƠN HÀNG</div>
                <div className='text-2xl font-semibold'>Đơn hàng #{String(order.id)}</div>
                <div className='mt-1 text-sm text-gray-500'>
                  Trạng thái:{' '}
                  <span className='font-medium text-gray-800'>{ORDERSTATUS[order.tracking as OrderStatus].label}</span>
                </div>
                <div className='mt-1 text-sm text-gray-500'>Tạo ngày {fmtDate(order.created_at)}</div>
              </div>
              <button onClick={onClose} className='rounded-xl border border-gray-200 p-2'>
                <X className='h-5 w-5' />
              </button>
            </div>

            <div className='mt-6 rounded-2xl border border-gray-200 p-4'>
              <div className='mb-2 text-sm font-medium'>Tiến trình</div>
              <StepLine steps={steps} activeIndex={activeIndex} />
            </div>

            <div className='mt-6 grid grid-cols-2 gap-3'>
              <div className='rounded-2xl border border-gray-200 p-4'>
                <div className='text-sm font-medium'>Người mua</div>
                <div className='mt-2 text-sm text-gray-600'>
                  {order.buyer?.full_name ?? '—'}
                  {order.buyer?.phone && <div className='text-xs text-gray-500'>SĐT: {order.buyer.phone}</div>}
                </div>
              </div>

              <div className='rounded-2xl border border-gray-200 p-4'>
                <div className='text-sm font-medium'>Người bán</div>
                <div className='mt-2 text-sm text-gray-600'>
                  {isSystemService ? SYSTEM_SELLER.name : (order.seller?.full_name ?? '—')}
                  <div className='text-xs text-gray-500'>
                    SĐT: {isSystemService ? SYSTEM_SELLER.phone : (order.seller?.phone ?? '—')}
                  </div>
                </div>
              </div>
            </div>

            {order.post?.product && (
              <div className='mt-6'>
                <ProductDetail order={order} />
              </div>
            )}

            <div className='mt-6 grid grid-cols-1 gap-3'>
              <ServiceDetail order={order} />
            </div>

            {/* Tổng tiền */}
            <div className='mt-6 rounded-2xl border border-gray-200'>
              <div className='flex items-center justify-between px-4 py-3'>
                <div className='font-semibold'>Tổng cộng</div>
                <div className='text-lg font-semibold'>{formatCurrencyVND(Number(order.price) || 0)}</div>
              </div>
              <div className='px-4 pb-3 text-sm text-gray-500'>
                Trạng thái:{' '}
                <span className='font-medium text-gray-800'>{ORDERSTATUS[order.tracking as OrderStatus].label}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
