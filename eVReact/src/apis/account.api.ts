import type { UpdateProfileSchema } from '~/schemas/updateProfile.schema'
import type { Overview, OverviewConfig } from '~/types/overview.type'
import type { User } from '~/types/user.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const accountApi = {
  getProfile() {
    return http.get<SuccessResponse<{ user: User; refresh_token: string }>>('/api/user/user-detail')
  },
  updateProfile(body: UpdateProfileSchema) {
    const formData = new FormData()
    formData.append('address', body.address ?? '')
    formData.append('description', body.description ?? '')
    formData.append('gender', body.gender ?? '')
    formData.append('email', body.email ?? '')
    formData.append('phone', body.phone ?? '')
    formData.append('full_name', body.full_name ?? '')

    if (body.avatar) {
      formData.append('avatar', body.avatar)
    }
    return http.put<SuccessResponse<{ user: User; refresh_token: string }>>('/api/user/update-user', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  updateAvatar(formData: FormData) {
    return http.put<SuccessResponse<{ user: User; refresh_token: string }>>('/api/user/update-user', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  updateNewPassword(currentPassword: string, newPassword: string, confirmPassword: string) {
    return http.put('/api/user/change-password', { currentPassword, newPassword, confirmPassword })
  },

  getInfoUser(_id: number | string, config: OverviewConfig) {
    return http.get<SuccessResponse<Overview>>(`/api/sellers/${_id}`, {
      params: { ...config }
    })
  }
}

export default accountApi
