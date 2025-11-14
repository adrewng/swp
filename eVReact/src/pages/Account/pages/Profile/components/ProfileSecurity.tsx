import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import accountApi from '~/apis/account.api'
import type { ChangePasswordSchema } from '~/schemas/changePassword.schema'
import changePasswordSchema from '~/schemas/changePassword.schema'

export default function ProfileSecurity() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ChangePasswordSchema>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })
  const updateNewPassword = useMutation({
    mutationFn: ({ currentPassword, newPassword, confirmPassword }: ChangePasswordSchema) =>
      accountApi.updateNewPassword(currentPassword, newPassword, confirmPassword),
    onSuccess: () => {
      toast.success('Cập nhật mật khẩu thành công')
      reset()
    },
    onError: () => {
      toast.error('Cập nhật mật khẩu thất bại')
    }
  })
  const onSubmit = (data: ChangePasswordSchema) => {
    updateNewPassword.mutate(data)
  }

  return (
    // <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
    <div>
      {/* Đổi mật khẩu */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-900 transition-all'
      >
        <h2 className='text-xl font-bold text-gray-900 mb-6'>Đổi mật khẩu</h2>

        <div className='space-y-4'>
          <div>
            <label className='text-sm font-medium text-gray-700 block mb-2'>Mật khẩu hiện tại</label>
            <input
              {...register('currentPassword')}
              type='password'
              className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors'
              placeholder='Nhập mật khẩu hiện tại'
            />
            {errors.currentPassword && <p className='text-red-500 text-sm mt-1'>{errors.currentPassword.message}</p>}
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700 block mb-2'>Mật khẩu mới</label>
            <input
              {...register('newPassword')}
              type='password'
              className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors'
              placeholder='Nhập mật khẩu mới'
            />
            {errors.newPassword && <p className='text-red-500 text-sm mt-1'>{errors.newPassword.message}</p>}
          </div>

          <div>
            <label className='text-sm font-medium text-gray-700 block mb-2'>Xác nhận mật khẩu mới</label>
            <input
              {...register('confirmPassword')}
              type='password'
              className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors'
              placeholder='Nhập lại mật khẩu mới'
            />
            {errors.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>}
          </div>
          <button
            type='submit'
            disabled={updateNewPassword.isPending}
            className='w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {updateNewPassword.isPending ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
          </button>
        </div>
      </form>
    </div>
  )
}
