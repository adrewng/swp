import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import transactionApi from '~/apis/transaction.api'
import { AppContext } from '~/contexts/app.context'

interface TopupModalProps {
  setShowTopup: () => void
}
export default function TopupModal(props: TopupModalProps) {
  const { setShowTopup } = props
  const [amount, setAmount] = useState(0)
  const { profile } = useContext(AppContext)

  const topup = useMutation({
    mutationFn: (formData: { user_id: number; amount: number; description: string }) =>
      transactionApi.topUpWallet(formData),
    onSuccess: (res) => {
      if (res.data?.data?.checkoutUrl) {
        toast.success('Đang chuyển đến trang thanh toán...')
        window.open(res.data.data.checkoutUrl, '_blank')
        setShowTopup()
      } else {
        toast.error('Không nhận được đường dẫn thanh toán!')
      }
    },
    onError: () => {
      toast.error('Nạp tiền thất bại, vui lòng thử lại!')
    }
  })
  const handleTopup = () => {
    if (!profile?.id) {
      toast.error('Không tìm thấy thông tin người dùng')
      return
    }

    if (!amount || amount <= 0) {
      toast.warning('Vui lòng nhập số tiền hợp lệ')
      return
    }

    const form = {
      user_id: profile.id,
      amount: Number(amount),
      description: 'Nạp tiền vào tài khoản'
    }

    topup.mutate(form)
  }

  return (
    <div className='fixed h-screen inset-0 bg-black/40 flex items-center justify-center z-50'>
      <div className='bg-white rounded-2xl shadow-xl w-full max-w-md p-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-4'>Nhập số tiền muốn nạp</h2>

        <input
          type='number'
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder='Ví dụ: 100000'
          className='w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900'
        />

        <div className='flex justify-end gap-3 mt-6'>
          <button
            onClick={setShowTopup}
            className='px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition'
          >
            Hủy
          </button>
          <button
            onClick={handleTopup}
            disabled={topup.isPending || !amount}
            className='px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50 flex items-center justify-center gap-2'
          >
            {topup.isPending && <Loader2 className='w-4 h-4 animate-spin' />}
            {topup.isPending ? 'Đang nạp...' : 'Xác nhận nạp'}
          </button>
        </div>
      </div>
    </div>
  )
}
