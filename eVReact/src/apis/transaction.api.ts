import type { RevenueByType, TransactionConfig, TransactionListAdmin, Transactions } from '~/types/transaction.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const transactionApi = {
  getUserTransaction(params: TransactionConfig) {
    return http.get<SuccessResponse<Transactions>>('/api/order/get-transaction-detail', { params })
  },
  topUpWallet({ user_id, amount, description }: { user_id: number; amount: number; description: string }) {
    return http.post('/api/payment/topup', { user_id, amount, description })
  },
  getTransactionByAdmin(params: { page?: number; limit?: number }) {
    return http.get<SuccessResponse<TransactionListAdmin>>('/api/admin/list-orders', { params })
  },
  getRevenueByType() {
    return http.get<SuccessResponse<RevenueByType>>('/api/order/get-revenue')
  }
}

export default transactionApi
