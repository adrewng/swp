import { Plus } from 'lucide-react'
import { useState } from 'react'
import type { Socket } from 'socket.io-client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '~/components/ui/alert-dialog'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'
import DepositModal from './DepositModal'

interface JoinABidButtonProps {
  deposit?: string
  auction_id?: number
  socket?: Socket | null
  disabled?: boolean
}

export function JoinABidButton(props: JoinABidButtonProps) {
  const { deposit, auction_id, socket, disabled } = props
  const [agree, setAgree] = useState(false)
  const [openDeposit, setOpenDeposit] = useState(false)

  const handleContinue = () => {
    setAgree(false)
    setOpenDeposit(true)
  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button disabled={disabled}  className='flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 font-medium text-white shadow-sm transition hover:translate-y-[-1px] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0'>
            <Plus className='h-5 w-5' />
            Tham gia đấu giá
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>THỎA THUẬN THAM GIA ĐẤU GIÁ</AlertDialogTitle>
            <AlertDialogDescription>
              <div className='max-h-[70vh] overflow-y-auto pr-2 space-y-4 text-sm text-muted-foreground leading-relaxed'>
                <div>
                  <h4 className='font-semibold text-zinc-900 dark:text-zinc-100'>1. Giới thiệu</h4>
                  <p>
                    Bằng việc nhấn <strong>“Tham gia đấu giá”</strong>, bạn đồng ý với các điều khoản và điều kiện dưới
                    đây của <strong>Hệ thống Giao dịch Xe & Pin Điện Cũ (EViest)</strong>.
                  </p>
                  <p>
                    Thỏa thuận này là cam kết giữa <strong>Người tham gia đấu giá (Bạn)</strong> và
                    <strong> Hệ thống EViest</strong> nhằm đảm bảo tính minh bạch, công bằng và trách nhiệm khi tham gia
                    các phiên đấu giá.
                  </p>
                </div>

                <div>
                  <h4 className='font-semibold text-zinc-900 dark:text-zinc-100'>2. Điều kiện tham gia</h4>
                  <ul className='list-disc pl-6 space-y-1'>
                    <li>Người tham gia phải có tài khoản hợp lệ và đã xác minh danh tính (KYC).</li>
                    <li>Mỗi người dùng chỉ được sử dụng một tài khoản duy nhất để tham gia đấu giá.</li>
                    <li>Hệ thống có quyền tạm dừng hoặc từ chối quyền đấu giá nếu phát hiện gian lận.</li>
                  </ul>
                </div>

                <div>
                  <h4 className='font-semibold text-zinc-900 dark:text-zinc-100'>3. Đặt cọc tham gia</h4>
                  <ul className='list-disc pl-6 space-y-1'>
                    <li>Người dùng cần thanh toán khoản đặt cọc hiển thị cho từng sản phẩm trước khi tham gia.</li>
                    <li>Khoản đặt cọc được giữ bởi hệ thống cho đến khi phiên đấu giá kết thúc.</li>
                    <li>Không thắng đấu giá: tiền cọc được hoàn 100% vào ví trong vòng 1–3 ngày làm việc.</li>
                    <li>Thắng đấu giá: tiền cọc được trừ vào giá mua cuối cùng.</li>
                  </ul>
                </div>

                <div>
                  <h4 className='font-semibold text-zinc-900 dark:text-zinc-100'>4. Nghĩa vụ khi thắng đấu giá</h4>
                  <ul className='list-disc pl-6 space-y-1'>
                    <li>Người thắng phải hoàn tất thanh toán trong thời hạn quy định (ví dụ: 48 giờ).</li>
                    <li>Không thanh toán đúng hạn: mất cọc, bị cấm tham gia đấu giá trong tương lai.</li>
                  </ul>
                </div>

                <div>
                  <h4 className='font-semibold text-zinc-900 dark:text-zinc-100'>5. Hủy bỏ và vi phạm</h4>
                  <ul className='list-disc pl-6 space-y-1'>
                    <li>Không được rút khỏi phiên sau khi đã đặt cọc.</li>
                    <li>Hành vi thông đồng, đẩy giá ảo hoặc gian lận sẽ bị khóa tài khoản vĩnh viễn.</li>
                  </ul>
                </div>

                <div>
                  <h4 className='font-semibold text-zinc-900 dark:text-zinc-100'>6. Cam kết</h4>
                  <p>
                    Bằng việc nhấn <strong>“Đồng ý & Tiếp tục”</strong>, bạn xác nhận đã đọc, hiểu rõ và đồng ý với toàn
                    bộ điều khoản trong bản thỏa thuận này.
                  </p>
                </div>
                <div className='flex items-start gap-3'>
                  <Checkbox id='terms-2' onClick={() => setAgree(!agree)} />
                  <div className='grid gap-2'>
                    <Label htmlFor='terms-2'>Đồng ý & Tham gia đấu giá</Label>
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>

            <AlertDialogAction
              disabled={!agree}
              className={!agree ? 'opacity-50 cursor-not-allowed' : ''}
              onClick={handleContinue}
            >
              Tiếp tục
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DepositModal
        open={openDeposit}
        onClose={() => setOpenDeposit(false)}
        deposit={deposit}
        auction_id={auction_id}
        socket={socket} // truyền socket xuống để Modal tự re-join
      />
    </div>
  )
}
