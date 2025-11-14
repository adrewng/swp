import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const URL_VERIFY_ORDER = 'api/order/verify'
const URL_CANCEL_ORDER = 'api/payment/cancel'
const URL_REPAY_POST = 'api/payment/repay-post'
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
  },
  repayPost(orderId: number | string) {
    return http.post<SuccessResponse<{ id: number; status: string; code: string }>>(URL_REPAY_POST, {
      orderCode: orderId
    })
  }
}

export default paymentApi
