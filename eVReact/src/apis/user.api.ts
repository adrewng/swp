import type { UserListGetByAdmin } from '~/types/user.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const userApi = {
  getAllUser(search?: string) {
    return http.get<SuccessResponse<UserListGetByAdmin>>('/api/user/get-all-users', {
      params: {
        search
      }
    })
  },
  lockUser(userId: number, reason: string) {
    return http.post(`/api/admin/block-user/${userId}`, { reason })
  }
}

export default userApi
