import { ArrowUpRight, CheckCircle, Clock, CreditCard, Gavel, Package, TrendingUp, XCircle } from 'lucide-react'
import type { TransactionQueryConfig } from '~/hooks/useTransactionQueryConfig'
import type { Transaction } from '~/types/transaction.type'
import { formatUTCDateString } from '~/utils/util'
import Pagination from '../../AccountOrders/components/Pagination/Pagination'
type PropsType = {
  transactions: Transaction[] | undefined
  transactionConfig: TransactionQueryConfig
  pageSize: number
}

export default function TransactionHistory(props: PropsType) {
  const { transactions, transactionConfig, pageSize } = props
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-gray-900'>Giao dịch gần đây</h2>
      </div>
      <div className='space-y-4'>
        {transactions?.map((transaction: Transaction) => (
          <TransactionItem key={transaction.created_at} transaction={transaction} />
        ))}
        <Pagination pageSize={pageSize ?? 1} queryConfig={transactionConfig} />
      </div>
    </div>
  )
}

// Transaction Item Component
const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const statusConfig = {
    paid: {
      label: 'Đã thanh toán',
      color: 'text-emerald-600 bg-emerald-50',
      icon: CheckCircle
    },
    pending: {
      label: 'Đang xử lý',
      color: 'text-amber-600 bg-amber-50',
      icon: Clock
    },
    failed: {
      label: 'Thất bại',
      color: 'text-rose-600 bg-rose-50',
      icon: XCircle
    }
  } as const
  const typeConfig = {
    deposit: {
      icon: CreditCard,
      color: 'bg-green-100 text-green-600'
    },
    package: {
      icon: Package,
      color: 'bg-blue-100 text-blue-600'
    },
    auction: {
      icon: Gavel,
      color: 'bg-violet-100 text-violet-600'
    },
    topup: {
      icon: ArrowUpRight,
      color: 'bg-emerald-100 text-emerald-600'
    },
    post: {
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-600'
    }
  } as const

  const statusKey = transaction.status?.toLowerCase() as keyof typeof statusConfig
  const statusStyle = statusConfig[statusKey] || {
    label: transaction.status || 'Không xác định',
    color: 'text-gray-600 bg-gray-100',
    icon: Clock
  }

  // const typeKey = transaction.service_type?.toLowerCase() as keyof typeof typeConfig
  const typeKey = transaction.service_type?.toLowerCase().replace(/\s+/g, '') as keyof typeof typeConfig

  const typeStyle = typeConfig[typeKey] || {
    color: 'bg-gray-100 text-gray-600',
    icon: Package
  }

  const StatusIcon = statusStyle.icon
  const TypeIcon = typeStyle.icon

  return (
    <div className='bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300'>
      <div className='flex items-start justify-between'>
        <div className='flex items-start gap-4'>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${typeStyle.color}`}>
            <TypeIcon className='w-6 h-6' />
          </div>

          <div>
            <h3 className='font-semibold text-gray-900 mb-1'>{transaction.service_name}</h3>
            <div className='flex items-center gap-3 text-sm text-gray-600'>
              <span className='flex items-center gap-1'>
                <span className='font-medium'>ID:</span> {transaction.phone}
              </span>
              <span>•</span>
              <span>{transaction.full_name}</span>
            </div>
            <div className='flex items-center gap-2 mt-2'>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle.color}`}
              >
                <StatusIcon className='w-3 h-3' />
                {statusStyle.label}
              </span>
              <span className='text-xs text-gray-500'>{formatUTCDateString(transaction.created_at)}</span>
            </div>
          </div>
        </div>
        <div className='text-right'>
          <div
            className={`text-2xl font-bold ${transaction.changing === 'Increase' ? 'text-emerald-600' : 'text-gray-900'}`}
          >
            {/* {transaction.service_type === 'refund' || transaction.service_type === 'topup' ? '+' : '-'} */}
            {transaction.changing === 'Increase' ? '+' : '-'}
            {Number(transaction.credits).toLocaleString()}
            VND
          </div>
        </div>
      </div>
    </div>
  )
}
