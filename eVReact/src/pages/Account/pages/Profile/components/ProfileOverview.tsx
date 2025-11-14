import { useMutation, type QueryObserverResult, type RefetchOptions } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'
import { Check, Edit2, Loader2 } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import accountApi from '~/apis/account.api'
import { AppContext } from '~/contexts/app.context'
import type { User } from '~/types/user.type'
import type { SuccessResponse } from '~/types/util.type'
import { setProfileToLS } from '~/utils/auth'
import ProfileSecurity from './ProfileSecurity'
import updateProfileSchema, { type UpdateProfileSchema } from '~/schemas/updateProfile.schema'

// ✅ import schema
// import updateProfileSchema from '~/schema/updateProfile.schema'

type Props = {
  profile?: User
  refetch: (
    options?: RefetchOptions
  ) => Promise<
    QueryObserverResult<AxiosResponse<SuccessResponse<{ user: User; refresh_token: string }>, unknown, object>, Error>
  >
}

export default function ProfileOverview({ profile, refetch }: Props) {
  const { setProfile } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  // ✅ setup react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<UpdateProfileSchema>({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      full_name: '',
      gender: '',
      phone: '',
      address: '',
      email: '',
      avatar: '',
      description: ''
    }
  })

  // ✅ Khi có profile -> fill form
  useEffect(() => {
    if (profile) {
      reset({
        full_name: profile.full_name || '',
        gender: (profile.gender as '' | 'Nam' | 'Nữ' | 'Khác' | undefined) ?? '',
        phone: profile.phone || '',
        address: profile.address || '',
        email: profile.email || '',
        avatar: profile.avatar || '',
        description: profile.description || ''
      })
    }
  }, [profile, reset])

  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateProfileSchema) => accountApi.updateProfile(data),
    onSuccess: async (res) => {
      const user = res.data.data.user
      setProfile(user)
      setProfileToLS(user)
      reset({
        full_name: user.full_name ?? '',
        gender: (user.gender as '' | 'Nam' | 'Nữ' | 'Khác' | undefined) ?? '',
        phone: user.phone ?? '',
        address: user.address ?? '',
        email: user.email ?? '',
        avatar: user.avatar ?? '',
        description: user.description ?? ''
      })
      await refetch()
      setIsEdit(false)
    }
  })

  const isMutating = updateProfileMutation.isPending || isSubmitting

  const onSubmit = (data: UpdateProfileSchema) => {
    updateProfileMutation.mutate(data)
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      <div className='bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-900 transition-all'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-bold text-gray-900'>Thông tin cá nhân</h2>
          <button
            onClick={() => {
              if (isEdit) {
                handleSubmit(onSubmit)()
              } else {
                setIsEdit(true)
              }
            }}
            disabled={isMutating}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors
              ${isMutating ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            aria-label={isEdit ? 'Lưu thông tin' : 'Chỉnh sửa thông tin'}
          >
            {isMutating ? (
              <Loader2 size={16} className='animate-spin text-gray-600' />
            ) : isEdit ? (
              <Check size={18} className='text-green-600' />
            ) : (
              <Edit2 size={16} className='text-gray-600' />
            )}
          </button>
        </div>

        <fieldset disabled={isMutating} className='space-y-5 disabled:opacity-100'>
          {/* Họ và tên + Giới tính */}
          <div className='grid grid-cols-2 gap-5'>
            <div>
              <label className='text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2'>Họ và tên</label>
              {isEdit ? (
                <>
                  <input
                    {...register('full_name')}
                    className={`border rounded-lg px-3 py-2 w-full ${
                      errors.full_name ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.full_name && <p className='text-sm text-red-600 mt-1'>{errors.full_name.message}</p>}
                </>
              ) : (
                <p className='text-base font-semibold text-gray-900'>{profile?.full_name || '_'}</p>
              )}
            </div>

            <div>
              <label className='text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2'>Giới tính</label>
              {isEdit ? (
                <>
                  <select
                    {...register('gender')}
                    className={`border rounded-lg px-3 py-2 w-full ${
                      errors.gender ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value=''>Chọn giới tính</option>
                    <option value='Nam'>Nam</option>
                    <option value='Nữ'>Nữ</option>
                    <option value='Khác'>Khác</option>
                  </select>
                  {errors.gender && <p className='text-sm text-red-600 mt-1'>{errors.gender.message}</p>}
                </>
              ) : (
                <p className='text-base font-semibold text-gray-900'>{profile?.gender || '_'}</p>
              )}
            </div>
          </div>

          {/* Số điện thoại + Email */}
          <div className='grid grid-cols-2 gap-5'>
            <div>
              <label className='text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2'>
                Số điện thoại
              </label>
              {isEdit ? (
                <>
                  <input
                    {...register('phone')}
                    className={`border rounded-lg px-3 py-2 w-full ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.phone && <p className='text-sm text-red-600 mt-1'>{errors.phone.message}</p>}
                </>
              ) : (
                <p className='text-base font-semibold text-gray-900'>{profile?.phone || '_'}</p>
              )}
            </div>

            <div>
              <label className='text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2'>Email</label>
              {isEdit ? (
                <>
                  <input
                    {...register('email')}
                    className={`border rounded-lg px-3 py-2 w-full ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.email && <p className='text-sm text-red-600 mt-1'>{errors.email.message}</p>}
                </>
              ) : (
                <p className='text-base font-semibold text-gray-900'>{profile?.email || '_'}</p>
              )}
            </div>
          </div>

          {/* Địa chỉ */}
          <div>
            <label className='text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2'>Địa chỉ</label>
            {isEdit ? (
              <>
                <input
                  {...register('address')}
                  className={`border rounded-lg px-3 py-2 w-full ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.address && <p className='text-sm text-red-600 mt-1'>{errors.address.message}</p>}
              </>
            ) : (
              <p className='text-base font-semibold text-gray-900'>{profile?.address || '_'}</p>
            )}
          </div>

          {/* Mô tả */}
          <div>
            <label className='text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2'>
              Mô tả bản thân
            </label>
            {isEdit ? (
              <>
                <textarea
                  {...register('description')}
                  rows={3}
                  className={`border rounded-lg px-3 py-2 w-full ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.description && <p className='text-sm text-red-600 mt-1'>{errors.description.message}</p>}
              </>
            ) : (
              <p className='text-base font-semibold text-gray-900'>{profile?.description || '_'}</p>
            )}
          </div>
        </fieldset>
      </div>

      <ProfileSecurity />
    </div>
  )
}
