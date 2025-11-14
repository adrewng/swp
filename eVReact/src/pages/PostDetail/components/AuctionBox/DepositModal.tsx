/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import type { Socket } from 'socket.io-client'
import auctionApi from '~/apis/auction.api'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog'
import { isAxiosPaymentRequiredError } from '~/utils/util'

interface DepositModalProps {
  open: boolean
  onClose: () => void
  deposit?: string
  auction_id?: number
  socket?: Socket | null
  onSuccess?: (res: any) => void
}

function ensureConnected(socket?: Socket | null): Promise<boolean> {
  if (!socket) return Promise.resolve(false)
  if (socket.connected) return Promise.resolve(true)
  return new Promise<boolean>((resolve) => {
    const onConnect = () => {
      socket.off('connect', onConnect)
      resolve(true)
    }
    socket.once('connect', onConnect)
  })
}
export default function DepositModal({ open, onClose, deposit, auction_id, socket, onSuccess }: DepositModalProps) {
  const [loading, setLoading] = useState(false)
  const qc = useQueryClient()

  // const navigate = useNavigate()
  // const navigate = useNavigate()

  const payDeposit = useMutation({
    mutationFn: (auction_id: number) => auctionApi.payDeposit(auction_id)
  })

  // const handleConfirm = () => {
  //   payDeposit.mutate(auction_id as number, {
  //     onSuccess: () => {
  //       // const post = data.data.data
  //       onClose()
  //       // navigate(`${path.post}/${generateNameId({ name: post.title, id: post.product_id })}`)
  //     },
  //     onError: (error) => {
  //       if (isAxiosPaymentRequiredError<{ checkoutUrl: string }>(error)) {
  //         const url = error.response?.data?.checkoutUrl
  //         if (url) {
  //           window.location.assign(url)
  //         } else {
  //           alert('Không thể chuyển đến trang thanh toán.')
  //         }
  //       } else {
  //         onClose()
  //         toast.error('Bạn đã cọc rồi!')
  //       }
  //     }
  //   })
  // }

  const handleConfirm = () => {
    if (!auction_id) {
      toast.error('Thiếu thông tin phiên đấu giá')
      return
    }
    setLoading(true)

    payDeposit.mutate(auction_id, {
      onSuccess: async (res: any) => {
        try {
          onClose()

          // Re-join phòng để nhận 'auction:joined'
          const aid = res?.auction?.id ?? auction_id
          if (aid) {
            const ok = await ensureConnected(socket)
            if (ok) socket!.emit('auction:join', { auctionId: aid })
          }

          // Đồng bộ lại dữ liệu auction (tuỳ chọn)
          qc.invalidateQueries({ queryKey: ['auction-info', String(aid)] })

          // Callback ngoài (nếu cần)
          onSuccess?.(res)

          toast.success('Đặt cọc thành công')
        } finally {
          setLoading(false)
        }
      },

      onError: (error: any) => {
        setLoading(false)

        // Không đủ CREDIT -> server trả checkoutUrl trong error (PENDING)
        if (isAxiosPaymentRequiredError<{ checkoutUrl: string }>(error)) {
          const url = error.response?.data?.checkoutUrl
          if (url) {
            onClose()
            window.location.assign(url)
          } else {
            alert('Không thể chuyển đến trang thanh toán.')
          }
          return
        }

        onClose()
        toast.error(error?.response?.data?.message || 'Bạn đã cọc rồi!')
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='font-bold text-xl'>Yêu cầu đặt cọc</DialogTitle>
          <DialogDescription className='space-y-1 text-sm text-zinc-600 leading-relaxed'>
            <p>
              Để đảm bảo <span className='font-semibold text-zinc-900'>tính minh bạch và nghiêm túc</span> trong mỗi
              phiên đấu giá, bạn cần đặt cọc{' '}
              <span className='font-semibold text-red-600'>{Number(deposit).toLocaleString('vi-VN')}₫</span> trước khi
              tham gia.
            </p>
            <p className='text-zinc-500 text-xs italic'>
              Việc đặt cọc giúp đảm bảo người tham gia thực sự quan tâm đến phiên đấu giá và bảo vệ quyền lợi của tất cả
              các bên.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex justify-end gap-2 mt-4'>
          <Button variant='outline' onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleConfirm} disabled={loading}>
            {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : 'Tiếp tục nạp tiền'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
