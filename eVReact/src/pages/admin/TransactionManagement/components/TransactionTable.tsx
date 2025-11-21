import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import type { TransactionListAdmin } from '~/types/transaction.type'
import { formatUTCDateString } from '~/utils/util'

export default function TransactionTable({ transaction }: { transaction: TransactionListAdmin }) {
  const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
    // PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
    // PROCESSING: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Processing' },
    // VERIFYING: { bg: 'bg-indigo-100', text: 'text-indigo-800', label: 'Verifying' },
    // SUCCESS: { bg: 'bg-green-100', text: 'text-green-800', label: 'Success' },
    // FAILED: { bg: 'bg-red-100', text: 'text-red-800', label: 'Failed' },
    // CANCELLED: { bg: 'bg-gray-200', text: 'text-gray-700', label: 'Cancelled' },
    // REFUND: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Refund' },
    // AUCTION_PROCESSING: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Auction Processing' },
    // AUCTION_SUCCESS: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Auction Success' },
    // AUCTION_FAIL: { bg: 'bg-rose-100', text: 'text-rose-800', label: 'Auction Failed' },
    // DEALING: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Dealing' },
    // DEALING_SUCCESS: { bg: 'bg-green-100', text: 'text-green-800', label: 'Dealing Success' },
    // DEALING_FAIL: { bg: 'bg-red-100', text: 'text-red-800', label: 'Dealing Fail' }
    PENDING: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: 'Đã thanh toán'
    },
    PAID: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'Đã thanh toán'
    },
    CANCELLED: {
      bg: 'bg-gray-200',
      text: 'text-gray-700',
      label: 'Hủy'
    }
  }

  // 🔹 Config màu cho TRACKING
  const TRACKING_STYLES: Record<string, { bg: string; text: string; label: string }> = {
    PENDING: { bg: 'bg-yellow-50', text: 'text-yellow-700', label: 'Pending' },
    PROCESSING: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Processing' },
    SUCCESS: { bg: 'bg-green-50', text: 'text-green-700', label: 'Success' },
    FAILED: { bg: 'bg-red-50', text: 'text-red-700', label: 'Failed' },
    DEALING: { bg: 'bg-orange-50', text: 'text-orange-700', label: 'Dealing' },
    DEALING_SUCCESS: { bg: 'bg-green-100', text: 'text-green-800', label: 'Dealing Success' },
    DEALING_FAIL: { bg: 'bg-red-100', text: 'text-red-800', label: 'Dealing Fail' },
    CANCELLED: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Cancelled' },
    REFUND: { bg: 'bg-purple-50', text: 'text-purple-700', label: 'Refund' },
    AUCTION_SUCCESS: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Auction Success' }
  }
  const TYPE_LABELS: Record<string, string> = {
    deposit: 'Đặt cọc',
    post: 'Bài đăng',
    package: 'Gói dịch vụ',
    auction: 'Đấu giá',
    topup: 'Nạp tiền'
  }

  // Helper: nếu status không có trong object, dùng default
  function getBadgeStyle(type: 'status' | 'tracking', key: string) {
    const map = type === 'status' ? STATUS_STYLES : TRACKING_STYLES
    return map[key] || { bg: 'bg-slate-100', text: 'text-slate-800', label: key.replace(/_/g, ' ') }
  }
  const StatusBadge = ({ type, value }: { type: 'status' | 'tracking'; value: string }) => {
    const s = getBadgeStyle(type, value)
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${s.bg} ${s.text}`}>{s.label}</span>
    )
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Giao dịch gần đây</CardTitle>
          <CardDescription>Các giao dịch mới nhất trên hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-gray-200 bg-gray-50'>
                  <th className='text-left py-3 px-4 font-semibold text-gray-700 text-sm'>Mã GD</th>
                  <th className='text-left py-3 px-4 font-semibold text-gray-700 text-sm'>Loại</th>
                  <th className='text-left py-3 px-4 font-semibold text-gray-700 text-sm'>Giá trị</th>
                  <th className='text-left py-3 px-4 font-semibold text-gray-700 text-sm'>Phương thức</th>
                  <th className='text-left py-3 px-4 font-semibold text-gray-700 text-sm'>Trạng thái</th>
                  <th className='text-left py-3 px-4 font-semibold text-gray-700 text-sm'>Tracking</th>
                  <th className='text-left py-3 px-4 font-semibold text-gray-700 text-sm'>Tên người dùng</th>
                  <th className='text-left py-3 px-4 font-semibold text-gray-700 text-sm'>Ngày tạo</th>
                </tr>
              </thead>

              <tbody>
                {transaction.orders.length ? (
                  transaction?.orders.map((txn) => (
                    <tr key={txn.id} className='border-b border-gray-200 hover:bg-gray-50'>
                      {/* Mã giao dịch */}
                      <td className='py-3 px-4 font-mono text-xs text-gray-700'>{txn.code}</td>
                      {/* Loại giao dịch */}
                      <td className='py-3 px-4 capitalize text-gray-800'>
                        {/* {txn.type === 'auction' ? 'Đấu giá' : txn.type} */}
                        {TYPE_LABELS[txn.type] || txn.type}
                      </td>
                      {/* Giá trị */}
                      <td className='py-3 px-4 font-semibold text-gray-900'>
                        {/* Format: 1.234.567đ */}
                        {Number(txn.price).toLocaleString('vi-VN')}₫
                      </td>
                      {/* Phương thức thanh toán */}
                      <td className='py-3 px-4 text-gray-700'>{txn.payment_method}</td>
                      {/* Trạng thái */}
                      {/* Status badge */}
                      <td>
                        <StatusBadge type='status' value={txn.status} />
                      </td>
                      <td>
                        <StatusBadge type='tracking' value={txn.tracking} />
                      </td>
                      {/* Buyer ID */}
                      <td className='py-3 px-4 text-gray-600'>{txn.full_name}</td>
                      {/* Ngày tạo */}
                      <td className='py-3 px-4 text-gray-500 text-sm whitespace-nowrap'>
                        {new Date(formatUTCDateString(txn.created_at)).toLocaleString('vi-VN', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className='text-center py-6 text-gray-500'>
                      Không có giao dịch nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
