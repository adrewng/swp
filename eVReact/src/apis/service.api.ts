import type { CategoryType } from '~/types/category.type'
import type { ServiceList } from '~/types/service.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

export const URL_GET_SERVICES = 'api/service/get-all'
export const URL_GET_SERVICE_POST = 'api/service/get-by-type/post'
const serviceApi = {
  getServices(type: Extract<CategoryType, 'vehicle' | 'battery'>) {
    return http.get<SuccessResponse<ServiceList>>(`${URL_GET_SERVICE_POST}/${type}`)
  },
  changeCost(serviceId: number, cost: number) {
    return http.put(`/api/service/${serviceId}`, { cost })
  }
}

export default serviceApi
