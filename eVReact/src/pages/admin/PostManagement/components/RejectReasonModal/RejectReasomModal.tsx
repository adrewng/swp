import { useEffect, useId, useState } from 'react'
import PortalModal from '~/components/PortalModal'
import { Button } from '~/components/ui/button'

export default function RejectReasonModal({
  open,
  onClose,
  onSubmit,
  submitting
}: {
  open: boolean
  onClose: () => void
  onSubmit: (reason: string) => void
  submitting?: boolean
}) {
  const [reason, setReason] = useState('')
  const titleId = useId()

  useEffect(() => {
    if (!open) setReason('')
  }, [open])

  const handleConfirm = () => {
    if (!reason.trim()) return
    onSubmit(reason.trim())
  }

  return (
    <PortalModal open={open} onClose={onClose} titleId={titleId}>
      <div className='p-5'>
        <h2 id={titleId} className='text-lg font-semibold'>
          Nhập lý do từ chối
        </h2>
        <p className='text-sm text-zinc-600 mt-1'>Vui lòng nêu rõ lý do để tác giả chỉnh sửa và gửi lại.</p>

        <div className='mt-4 space-y-2'>
          <label className='text-sm font-medium text-zinc-700'>Reason</label>
          <textarea
            id='reject-reason'
            rows={6}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder='Ví dụ: Hình ảnh mờ/thiếu, giá không hợp lệ, thiếu thông tin bắt buộc…'
            className='w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm outline-none
                       focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 disabled:opacity-50'
          />
          <p className='text-xs text-zinc-500'>* Bắt buộc. Tối thiểu 5 ký tự.</p>
        </div>

        <div className='mt-5 flex justify-end gap-2'>
          <Button variant='outline' onClick={onClose} disabled={submitting}>
            Hủy
          </Button>
          <Button onClick={handleConfirm} disabled={submitting || reason.trim().length < 5}>
            {submitting ? 'Đang gửi…' : 'Xác nhận từ chối'}
          </Button>
        </div>
      </div>
    </PortalModal>
  )
}
