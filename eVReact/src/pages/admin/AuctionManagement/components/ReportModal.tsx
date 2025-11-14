''

import { Dialog } from '@headlessui/react' // hoặc dùng modal lib khác tùy bạn
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { XCircle } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import auctionApi from '~/apis/auction.api'
import type { ReportAuction } from '~/types/auction.type'

export default function ReportModal({
  auctionId,
  winnerId,
  sellerId,
  onClose,
  open = false
}: {
  auctionId: number
  winnerId: number
  sellerId: number
  onClose: () => void
  open: boolean
}) {
  const [reason, setReason] = useState('')
  const [faultType, setFaultType] = useState<'seller' | 'winner' | ''>('')
  const [userId, setUserId] = useState<number | null>(null)

  const queryClient = useQueryClient()
  const createReport = useMutation({
    mutationFn: (data: ReportAuction) => auctionApi.createReportAuction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-auction'] })
      toast.success('Báo cáo đã được gửi thành công!')
      onClose()
      setReason('')
      setFaultType('')
      setUserId(null)
    },
    onError: () => {
      toast.info('Gửi báo cáo thất bại, vui lòng thử lại!')
    }
  })

  const handleSelect = (value: 'seller' | 'winner') => {
    setFaultType(value)
    setUserId(value === 'seller' ? sellerId : winnerId)
  }

  const handleSubmit = () => {
    if (!reason || !faultType || !userId) {
      toast.warning('Vui lòng nhập đầy đủ thông tin!')
      return
    }

    const payload = {
      auction_id: auctionId,
      user_id: userId,
      reason: reason,
      fault_type: faultType
    }

    createReport.mutate(payload)
  }

  return (
    <>
      {/* Modal */}
      <Dialog open={open} onClose={onClose} className='relative z-50'>
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <Dialog.Panel className='w-full max-w-md rounded-lg bg-white p-6 shadow-lg'>
            <Dialog.Title className='text-lg font-semibold mb-4'>Báo cáo vi phạm</Dialog.Title>

            <label className='block text-sm font-medium mb-1 text-gray-700'>Lý do</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className='w-full rounded-lg border border-gray-300 p-2 text-sm mb-4 focus:ring-2 focus:ring-blue-100 outline-none'
              placeholder='Nhập lý do báo cáo...'
              rows={3}
            />

            <label className='block text-sm font-medium mb-2 text-gray-700'>Đối tượng vi phạm</label>
            <div className='flex gap-3 mb-5'>
              <button
                type='button'
                onClick={() => handleSelect('seller')}
                className={`flex items-center gap-2 w-1/2 justify-center rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  faultType === 'seller'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <XCircle className='h-4 w-4' />
                Người bán
              </button>
              <button
                type='button'
                onClick={() => handleSelect('winner')}
                className={`flex items-center gap-2 w-1/2 justify-center rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  faultType === 'winner'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <XCircle className='h-4 w-4' />
                Người mua
              </button>
            </div>

            <div className='flex justify-end gap-2'>
              <button
                onClick={onClose}
                className='rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100'
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                disabled={createReport.isPending}
                className='rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50'
              >
                {createReport.isPending ? 'Đang gửi...' : 'Gửi báo cáo'}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
