import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext } from 'react'
import { createPortal } from 'react-dom'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { authApi } from '~/apis/auth.api'
import Button from '~/components/Button'
import { AppContext } from '~/contexts/app.context'
import InputNumber from '../InputNumber'

const phoneSchema = yup.object({
  phone: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .matches(/^[0-9]{10,11}$/, 'Số điện thoại phải có 10-11 chữ số')
})

type PhoneFormData = yup.InferType<typeof phoneSchema>

interface PhoneRequiredModalProps {
  isOpen: boolean
}

export default function PhoneRequiredModal({ isOpen = false }: PhoneRequiredModalProps) {
  const navigate = useNavigate()
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    control
  } = useForm<PhoneFormData>({
    resolver: yupResolver(phoneSchema),
    defaultValues: {
      phone: ''
    }
  })

  const { setProfile } = useContext(AppContext)

  const handleClose = () => {
    reset({ phone: '' })
    navigate(-1)
  }

  const updatePhoneMutation = useMutation({
    mutationFn: (phone: string) => authApi.updatePhone(phone),
    onSuccess: (data) => {
      setProfile(data.data.data.user)
      toast.success('Cập nhật số điện thoại thành công!')
      handleClose()
    }
  })
  const onSubmit = (data: PhoneFormData) => {
    updatePhoneMutation.mutate(data.phone)
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50'
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='bg-white rounded-2xl max-w-md w-full shadow-2xl border border-zinc-200'
          >
            <div className='relative p-6 border-b border-zinc-200'>
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className='text-center'
              >
                <div className='w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center'>
                  <svg className='w-8 h-8 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                    />
                  </svg>
                </div>
                <h2 className='text-xl font-bold text-zinc-900 mb-2'>Cần cập nhật số điện thoại</h2>
                <p className='text-sm text-zinc-600'>Bạn cần cập nhật số điện thoại để có thể truy cập trang này</p>
              </motion.div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='p-6'>
              <div className='space-y-4'>
                {/* Phone Input */}
                <Controller
                  control={control}
                  name='phone'
                  render={({ field }) => {
                    return (
                      <InputNumber
                        type='text'
                        className='grow'
                        placeholder='Nhập số điện thoại'
                        classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                        classNameError='hidden'
                        {...field}
                      />
                    )
                  }}
                />

                {/* Info */}
                <div className='p-3 bg-blue-50 rounded-lg'>
                  <p className='text-sm text-blue-700'>
                    <span className='font-medium'>Lưu ý:</span> Số điện thoại sẽ được sử dụng để xác thực và liên lạc.
                    Vui lòng nhập đúng số điện thoại của bạn.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className='flex justify-end gap-3 mt-6'>
                <Button
                  type='button'
                  onClick={handleClose}
                  className='px-6 py-2 border border-zinc-300 text-zinc-700 rounded-lg font-medium hover:bg-zinc-50 transition-colors'
                >
                  Hủy
                </Button>
                <Button
                  type='submit'
                  disabled={isSubmitting || updatePhoneMutation.isPending}
                  isLoading={isSubmitting || updatePhoneMutation.isPending}
                  className='px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-zinc-800 disabled:bg-zinc-300 disabled:cursor-not-allowed transition-colors'
                >
                  Cập nhật
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
