import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const URL_VERIFY_ORDER = 'api/order/verify'
const URL_CANCEL_ORDER = 'api/payment/cancel'
const paymentApi = {
  verify(orderCode: string, signal?: AbortSignal) {
    return http.post<SuccessResponse<{ id: number; status: string; code: string }>>(
      URL_VERIFY_ORDER,
      { orderCode },
      { signal }
    )
  },
  cancel(orderCode: string, signal?: AbortSignal) {
    return http.post<SuccessResponse<{ id: number; status: string; code: string }>>(
      URL_CANCEL_ORDER,
      { orderCode },
      { signal }
    )
  }
}

export default paymentApi
