import { Link } from 'react-router-dom'
import type { AuctionType, SessionStatus } from '~/types/auction.type'
import { fmtDate, formatCurrencyVND } from '~/utils/util'
import StatusPill from '../StatusPill'

export default function SessionsTable({ rows, emptyText }: { rows: AuctionType[]; emptyText: string }) {
  return (
    <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white'>
      <table className='min-w-full'>
        <thead className='bg-gray-50 text-xs uppercase text-gray-500'>
          <tr>
            <th className='px-4 py-3 text-left'>Phiên</th>
            <th className='px-4 py-3 text-left'>Thời gian</th>
            <th className='px-4 py-3 text-left'>Giá</th>
            <th className='px-4 py-3 text-left'>Trạng thái</th>
            <th className='px-4 py-3 text-right'>Thao tác</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100'>
          {rows.length === 0 && (
            <tr>
              <td colSpan={5} className='px-4 py-6 text-center text-sm text-gray-500'>
                {emptyText}
              </td>
            </tr>
          )}
          {rows.map((s) => (
            <tr key={s.id} className='hover:bg-gray-50'>
              <td className='px-4 py-3'>
                <div className='font-medium text-gray-900'>{s.title}</div>
                <div className='text-xs text-gray-500'>Mã phiên: #{s.id}</div>
              </td>
              <td className='px-4 py-3'>
                {s.status === 'draft' ? (
                  <div className='text-sm text-gray-500 italic'>Chưa lên lịch</div>
                ) : (
                  <div className='text-sm text-gray-800'>
                    {fmtDate(s.startAt)} → {fmtDate(s.endAt)}
                  </div>
                )}
              </td>
              <td className='px-4 py-3'>
                <div className='text-sm text-gray-800'>
                  {typeof s.currentPrice === 'number' ? (
                    <>
                      Hiện tại: <span className='font-semibold'>{formatCurrencyVND(s.currentPrice)}</span>
                    </>
                  ) : (
                    <>
                      Khởi điểm: <span className='font-semibold'>{formatCurrencyVND(s.startingBid)}</span>
                    </>
                  )}
                </div>
                {typeof s.buyNowPrice === 'number' && s.buyNowPrice > 0 && (
                  <div className='text-xs text-gray-500'>Mua ngay: {formatCurrencyVND(s.buyNowPrice)}</div>
                )}
                {/* {typeof s.bid_count === 'number' && s.bid_count > 0 && (
                  <div className='text-xs text-gray-500 mt-0.5'>{s.bid_count} lượt đặt</div>
                )} */}
              </td>
              <td className='px-4 py-3'>
                <StatusPill status={(s.status ?? 'scheduled') as SessionStatus} />
              </td>
              <td className='px-4 py-3 text-right'>
                <Link
                  to={`/account/orders?highlight=${s.id}`}
                  className='rounded-xl border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50'
                >
                  Xem phiên
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
