import { CheckCircle, ClipboardList, Loader2, RefreshCcw, Truck, X } from 'lucide-react'
import { ORDERSTATUS, getOrderStatusLabel, type OrderStatus } from '~/constants/order'
import type { Order } from '~/types/order.type'

const STATUS_ICON: Record<OrderStatus, React.ComponentType<{ className?: string }>> = {
  PENDING: ClipboardList,
  PROCESSING: Loader2,
  VERIFYING: ClipboardList,
  SUCCESS: CheckCircle,
  FAILED: X,
  CANCELLED: X,
  REFUND: RefreshCcw,
  AUCTION_PROCESSING: Truck,
  AUCTION_SUCCESS: CheckCircle,
  AUCTION_FAIL: X,
  DEALING: Loader2,
  DEALING_SUCCESS: CheckCircle,
  DEALING_FAIL: X
}

export function StatusPill({ status, type }: { status: OrderStatus; type?: Order['type'] }) {
  const meta = ORDERSTATUS[status]
  const Icon = STATUS_ICON[status]
  const label = getOrderStatusLabel(status, type)

  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-medium ring-1',
        meta.className
      ].join(' ')}
      title={label}
    >
      <Icon className={`h-3.5 w-3.5 ${status === 'AUCTION_PROCESSING' ? 'animate-spin-slow' : ''}`} />
      {label}
    </span>
  )
}
