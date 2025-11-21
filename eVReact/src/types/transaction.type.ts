export interface Transaction {
  user_id: number
  full_name: string
  email: string
  phone: string
  total_credit: string
  service_type: string
  service_name: string
  description: null
  cost: string
  credits: string
  changing: string
  unit: string
  status: string
  created_at: string
}

export type Transactions = {
  data: Transaction[]
  total_spend: number
  total_topup: number
  total_credit: number
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface TransactionAdmin {
  id: number
  type: string
  status: string
  price: string
  service_id: number
  product_id: number
  buyer_id: number
  full_name: string
  created_at: string
  code: string
  payment_method: string
  description: string
  updated_at: string
  tracking: string
}

export interface TransactionListAdmin {
  orders: TransactionAdmin[]
  pagination: {
    limmit: number
    page: number
    page_size: number
  }
  total: number
  totalRevenue: number
}
export interface RevenueByType {
  revenue: number
  revenue_auctions: number
  revenue_packages: number
  revenue_post: number
  daily_revenue: { date: string; revenue: number }[]
}

export interface TransactionConfig {
  page?: number | string
  limit?: number | string
}
