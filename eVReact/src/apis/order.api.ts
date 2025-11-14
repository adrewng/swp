import type { OrderList, OrderListConfig } from '~/types/order.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const URL_CREATE_AUCTION_REQUEST = 'api/order/order-by-user'

const orderApi = {
  getOrdersByUser(config?: OrderListConfig) {
    return http.get<SuccessResponse<OrderList>>(URL_CREATE_AUCTION_REQUEST, { params: config })
  }
}

export default orderApi
