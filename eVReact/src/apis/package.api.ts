import type {
  FormCreatePackage,
  FormUpdatePackage,
  Package,
  PackageByMe,
  PackageConfig,
  Packages
} from '~/types/package.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'
const packageApi = {
  getVehiclePackage() {
    return http.get<SuccessResponse<Package[]>>('/api/package/get-all?product_type=vehicle')
  },
  getBatteryPackage() {
    return http.get<SuccessResponse<Package[]>>('/api/package/get-all?product_type=battery')
  },
  getCheckoutPackage(params: PackageConfig) {
    return http.get<SuccessResponse<Packages>>('/api/service/packages', { params })
  },
  createPackage(payload: { user_id: number; service_id: number }) {
    return http.post('/api/payment/package-payment', payload)
  },
  getPackageByAdmin() {
    return http.get<SuccessResponse<Package[]>>('/api/package/get-all')
  },
  deletePackageByAdmin(id: number) {
    return http.delete(`/api/package/${id}`)
  },
  createPackageByAdmin(formData: FormCreatePackage) {
    return http.post('/api/package/create', formData)
  },
  updatePackageByAdmin(formData: FormUpdatePackage, id: number) {
    return http.put(`/api/package/${id}`, formData)
  },
  getPackageByMe() {
    return http.get<SuccessResponse<PackageByMe[]>>('/api/package/user')
  }
}

export default packageApi
