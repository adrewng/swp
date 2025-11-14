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
  }
}

export default userApi
