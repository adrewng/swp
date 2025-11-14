''

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import auctionApi from '~/apis/auction.api'
import contractApi from '~/apis/contract.api'
import type { FormContract } from '~/types/admin/contract.type'
import type { Auction } from '~/types/auction.type'
import ReportModal from './ReportModal'

// interface FilterProps {
//   status: string
//   search: string
//   sortBy: string
// }

// export default function AuctionsTable({ filters }: { filters: FilterProps }) {

interface PropsType {
  auctions: Auction[] | undefined
}
export default function AuctionsTable(props: PropsType) {
  const { auctions } = props
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [editingAuction, setEditingAuction] = useState<Auction | null>(null)
  const [contractAuction, setContractAuction] = useState<Auction | null>(null)
  const [duration, setDuration] = useState<number>(0)
  const [isVerify, setIsVerify] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [form, setForm] = useState<FormContract>({
    seller_id: 0,
    buyer_id: 0,
    product_id: 0,
    deposit_amount: 0,
    vehicle_price: 0,
    commission_percent: 5,
    dispute_city: 'Ho Chi Minh',
    status: 'pending'
  })
  const qc = useQueryClient()

  const { data: contractData } = useQuery({
    queryKey: ['contract'],
    queryFn: contractApi.getAllContract
  })
  console.log('contract -', contractData)

  // start auction
  const startAuction = useMutation({
    mutationFn: (auction_id: number) => auctionApi.startAuction(auction_id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['all-auction'] })
    }
  })
  const handleStartAuction = (auction_id: number) => {
    startAuction.mutate(auction_id)
  }

  //update auction before start
  const updateAuction = useMutation({
    mutationFn: ({ auctionId, duration }: { auctionId: number; duration: number }) =>
      auctionApi.verifyAuctionByAdmin(auctionId, duration),
    onSuccess: () => {
      toast.success('Xác minh phiên đấu giá thành công!')
      qc.invalidateQueries({ queryKey: ['all-auction'] })
      setEditingAuction(null)
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi xác minh!')
    }
  })
  const handleSave = (auctionId: number, duration: number, isVerify: boolean) => {
    if (isVerify) {
      updateAuction.mutate({ auctionId, duration })
    } else {
      toast.info('Chưa chọn xác minh phiên đấu giá!')
    }
  }
  const handleEdit = (auction: Auction) => {
    setEditingAuction(auction)
    setDuration(auction.duration || 0)
  }

  const handleCreateContract = (auction: Auction) => {
    setContractAuction(auction)
    // Điền sẵn form từ auction
    setForm({
      seller_id: auction.seller_id || 0,
      buyer_id: auction.winner_id || 0,
      product_id: auction.product_id || 0,
      deposit_amount: Number(auction.deposit) || 0,
      vehicle_price: Number(auction.winning_price) || 0,
      commission_percent: 5,
      dispute_city: 'Ho Chi Minh',
      status: 'pending'
    })
  }
  const createContract = useMutation({
    mutationFn: () => contractApi.createContract(form),
    onSuccess: (res) => {
      toast.success('Tạo hợp đồng thành công!')

      const url = res?.data?.data?.url
      if (url) {
        window.open(url, '_blank')
      }

      setContractAuction(null)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Tạo hợp đồng thất bại!')
    }
  })
  const handleSubmitContract = () => createContract.mutate()

  const formatMoney = (value: string | number) =>
    Number(value).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })

  const getStatusBadge = (status: string) => {
    const badges = {
      live: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Đang đấu giá' },
      draft: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Nháp' },
      verified: { bg: 'bg-green-50', text: 'text-blue-700', label: 'Đã kiểm tra' },
      ended: { bg: 'bg-slate-50', text: 'text-slate-700', label: 'Kết thúc' },
      signed: { bg: 'bg-purple-50', text: 'text-purple-700', label: 'Đã kí' },
      reported: { bg: 'bg-red-50', text: 'text-red-700', label: 'Đã báo cáo' },
      pending: { bg: 'bg-gray-50', text: 'text-gray-700', label: 'Đang ký' }
    }
    return badges[status as keyof typeof badges] || badges.ended
  }

  return (
    <div className='space-y-3 rounded-xl border border-slate-200 bg-white shadow-sm'>
      {/* Header */}
      <div className='hidden border-b border-slate-200 px-6 py-4 sm:grid sm:grid-cols-12 sm:gap-4'>
        <div className='col-span-4 text-xs font-semibold uppercase tracking-wide text-slate-600'>Sản Phẩm</div>
        <div className='col-span-2 text-xs font-semibold uppercase tracking-wide text-slate-600'>Giá Khởi Điểm</div>
        <div className='col-span-2 text-xs font-semibold uppercase tracking-wide text-slate-600'>Giá Mục Tiêu</div>
        <div className='col-span-2 text-xs font-semibold uppercase tracking-wide text-slate-600'>Trạng Thái</div>
        <div className='col-span-2 text-xs font-semibold uppercase tracking-wide text-slate-600 text-right'>
          Hành Động
        </div>
      </div>

      {/* Rows */}
      <div className='divide-y divide-slate-200'>
        {auctions &&
          auctions.map((auction: Auction) => {
            let badge = getStatusBadge(auction.status)

            // Ưu tiên hiển thị reported nếu có báo cáo
            if (auction.has_report) {
              badge = getStatusBadge('reported')
            } else if (auction.contract_status === 'signed' && auction.contract_url) {
              badge = getStatusBadge('signed')
            } else if (auction.contract_status === 'pending') {
              badge = getStatusBadge('pending')
            }
            const isExpanded = expandedId === auction.id

            return (
              <div key={auction.id}>
                {/* Hàng chính */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : auction.id)}
                  className='grid grid-cols-1 gap-4 px-6 py-4 transition hover:bg-slate-50 sm:grid-cols-12 sm:items-center cursor-pointer'
                >
                  <div className='col-span-1 sm:col-span-4'>
                    <p className='font-medium text-slate-900 line-clamp-1'>{auction.title}</p>
                    <p className='mt-1 text-xs text-slate-500'>Mã sản phẩm: {auction.product_id}</p>
                  </div>

                  <div className='col-span-1 sm:col-span-2'>
                    <p className='text-sm font-semibold text-slate-900'>{formatMoney(auction.starting_price)}</p>
                  </div>

                  <div className='col-span-1 sm:col-span-2'>
                    <p className='text-sm font-semibold text-emerald-700'>{formatMoney(auction.target_price)}</p>
                  </div>

                  <div className='col-span-1 sm:col-span-2'>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${badge.bg} ${badge.text}`}
                    >
                      {badge.label}
                    </span>
                  </div>

                  {auction.status === 'ended' ? (
                    <div className='col-span-1 sm:col-span-2 flex justify-end gap-2 cursor-default'>
                      {auction.contract_status === 'signed' && auction.contract_url ? (
                        <>
                          <button
                            onClick={() => {
                              if (auction.contract_url) {
                                window.open(auction.contract_url, '_blank')
                              } else {
                                toast.error('Không tìm thấy đường dẫn hợp đồng!')
                              }
                            }}
                            className='rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 transition-colors'
                          >
                            Xem hợp đồng
                          </button>
                        </>
                      ) : (
                        <>
                          <ReportModal
                            auctionId={auction.id}
                            winnerId={auction.winner_id}
                            sellerId={auction.seller_id}
                            onClose={() => setOpenModal(false)}
                            open={openModal}
                          />
                          {auction.has_report && (
                            <div className='rounded-lg bg-gray-300 px-3 py-2 text-xs font-medium text-gray-700 cursor-not-allowed'>
                              Đã báo cáo
                            </div>
                          )}

                          {!auction.has_report && (
                            <>
                              {auction.contract_status !== 'pending' && (
                                <button
                                  onClick={() => handleCreateContract(auction)}
                                  className='rounded-lg bg-green-500 px-3 py-2 text-xs font-medium text-white hover:bg-green-600 transition-colors'
                                >
                                  Tạo hợp đồng
                                </button>
                              )}
                              <button
                                onClick={() => setOpenModal(true)}
                                className='rounded-lg bg-red-500 px-3 py-2 text-xs font-medium text-white hover:bg-red-600 transition-colors'
                              >
                                Báo cáo
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  ) : (
                    <div className='col-span-1 sm:col-span-2 flex justify-end gap-2 cursor-default'>
                      <button
                        onClick={() => handleEdit(auction)}
                        className='rounded-lg bg-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-300 transition-colors'
                      >
                        Chỉnh Sửa
                      </button>
                      <button
                        onClick={() => handleStartAuction(auction.id)}
                        className='rounded-lg bg-red-500 px-3 py-2 text-xs font-medium text-white hover:bg-red-600 transition-colors'
                      >
                        Bắt Đầu
                      </button>
                    </div>
                  )}
                </div>

                {/* Chi tiết mở rộng */}
                {isExpanded && (
                  <div className='border-t border-slate-200 bg-slate-50 px-6 py-4'>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                      <div>
                        <p className='text-xs font-semibold uppercase text-slate-600'>Bước Giá</p>
                        <p className='mt-1 text-sm text-slate-900'>{formatMoney(auction.step)}</p>
                      </div>
                      <div>
                        <p className='text-xs font-semibold uppercase text-slate-600'>Tiền Cọc</p>
                        <p className='mt-1 text-sm text-slate-900'>{formatMoney(auction.deposit)}</p>
                      </div>
                      <div>
                        <p className='text-xs font-semibold uppercase text-slate-600'>Thời Lượng</p>
                        <p className='mt-1 text-sm text-slate-900'>{auction.duration} giây</p>
                      </div>
                      <div>
                        <p className='text-xs font-semibold uppercase text-slate-600'>Người Bán</p>
                        <p className='mt-1 text-sm text-slate-900'>ID {auction.seller_id}</p>
                      </div>
                      {auction.winning_price && (
                        <div>
                          <p className='text-xs font-semibold uppercase text-slate-600'>Giá Trúng Thầu</p>
                          <p className='mt-1 text-sm font-semibold text-emerald-600'>
                            {formatMoney(auction.winning_price)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
      </div>

      {/* Modal chỉnh sửa */}
      {editingAuction && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
          <div className='rounded-xl bg-white p-6 shadow-xl w-96'>
            <h2 className='text-lg font-semibold text-slate-900 mb-4'>Chỉnh Sửa Phiên Đấu Giá</h2>

            <div className='space-y-4'>
              {/* Thời lượng */}
              <div>
                <label className='block text-sm font-medium text-slate-700'>Thời lượng (giây)</label>
                <input
                  type='number'
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className='mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm'
                />
              </div>

              {/* Check verify */}
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id='isVerify'
                  checked={isVerify}
                  onChange={(e) => setIsVerify(e.target.checked)}
                  className='h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500'
                />
                <label htmlFor='isVerify' className='text-sm text-slate-700'>
                  Xác minh phiên đấu giá
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className='mt-6 flex justify-end gap-2'>
              <button
                onClick={() => setEditingAuction(null)}
                className='rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200'
              >
                Hủy
              </button>

              <button
                onClick={() => handleSave(editingAuction.id, duration, isVerify)}
                className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {contractAuction && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
          <div className='w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200'>
            <div className='flex items-center justify-between px-6 py-4 border-b border-slate-200'>
              <h2 className='text-xl font-semibold text-slate-900'>
                Tạo Hợp Đồng cho sản phẩm #{contractAuction.product_id}
              </h2>
              <button
                onClick={() => setContractAuction(null)}
                className='text-slate-500 hover:text-slate-700 transition'
              >
                ✕
              </button>
            </div>

            <div className='px-6 py-5 max-h-[70vh] overflow-y-auto'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {Object.entries(form).map(([key, value]) => {
                  const isMoneyField = key === 'deposit_amount' || key === 'vehicle_price'
                  const displayValue = isMoneyField ? formatMoney(Number(value)) : String(value ?? '')

                  return (
                    <div key={key}>
                      <label className='block text-sm font-medium text-slate-700 capitalize'>
                        {key.replace('_', ' ')}
                      </label>
                      <input
                        type={isMoneyField ? 'text' : typeof value === 'number' ? 'number' : 'text'}
                        value={displayValue}
                        readOnly
                        className='mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white transition'
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <div className='flex justify-end gap-3 border-t border-slate-200 px-6 py-4 bg-slate-50 rounded-b-2xl'>
              <button
                onClick={() => setContractAuction(null)}
                className='rounded-lg bg-white border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition'
              >
                Hủy
              </button>
              <button
                onClick={handleSubmitContract}
                className='rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition'
              >
                Tạo Hợp Đồng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
