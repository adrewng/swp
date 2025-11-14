import { Link } from 'react-router-dom'
import type { Participation, SessionStatus } from '~/types/auction.type'
import { fmtDate, formatCurrencyVND } from '~/utils/util'
import StatusPill from '../StatusPill'

export default function ParticipationsTable({ rows, emptyText }: { rows: Participation[]; emptyText: string }) {
  return (
    <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white'>
      <table className='min-w-full'>
        <thead className='bg-gray-50 text-xs uppercase text-gray-500'>
          <tr>
            <th className='px-4 py-3 text-left'>Phiên</th>
            <th className='px-4 py-3 text-left'>Thời gian</th>
            <th className='px-4 py-3 text-left'>Giá</th>
            <th className='px-4 py-3 text-left'>Trạng thái</th>
            <th className='px-4 py-3 text-left'>Bên tôi</th>
            <th className='px-4 py-3 text-right'>Thao tác</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100'>
          {rows.length === 0 && (
            <tr>
              <td colSpan={6} className='px-4 py-6 text-center text-sm text-gray-500'>
                {emptyText}
              </td>
            </tr>
          )}
          {rows.map((p) => {
            const s = p.auction
            return (
              <tr key={s.id} className='hover:bg-gray-50'>
                <td className='px-4 py-3'>
                  <div className='font-medium text-gray-900'>{s.title}</div>
                  <div className='text-xs text-gray-500'>Mã phiên: #{s.id}</div>
                </td>
                <td className='px-4 py-3'>
                  <div className='text-sm text-gray-800'>
                    {fmtDate(s.startAt)} → {fmtDate(s.endAt)}
                  </div>
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
                </td>
                <td className='px-4 py-3'>
                  <StatusPill status={(s.status ?? 'SCHEDULED') as SessionStatus} />
                </td>
                <td className='px-4 py-3'>
                  <div className='text-sm'>
                    {p.result === 'win' && (
                      <span className='rounded-md bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700'>Thắng</span>
                    )}
                    {p.result === 'lose' && (
                      <span className='rounded-md bg-rose-100 px-2 py-0.5 text-xs text-rose-700'>Trượt</span>
                    )}
                    {(!p.result || p.result === 'pending') && (
                      <span className='rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700'>Đang chờ</span>
                    )}
                  </div>
                  {typeof s.topBid === 'number' && (
                    <div className='mt-1 text-xs text-gray-500'>
                      Giá cao nhất của tôi: {formatCurrencyVND(s.topBid)}
                    </div>
                  )}
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
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
