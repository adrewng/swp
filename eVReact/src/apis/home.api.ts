import type { Dashboard } from '~/types/admin/home.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const dashboardApi = {
  getDashboardInfo() {
    return http.get<SuccessResponse<Dashboard>>('/api/admin/dashboard')
  }
}
export default dashboardApi
