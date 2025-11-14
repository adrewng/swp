export interface FormContract {
  seller_id: number
  buyer_id: number
  product_id: number
  deposit_amount: number
  vehicle_price: number
  commission_percent: number
  dispute_city: string
  status: string
}

export interface Contract {
  id: number
  contract_code: string
  seller_id: number
  buyer_id: number
  product_id: number
  deposit_amount: string
  vehicle_price: string
  commission_percent: string
  dispute_city: string
  status: string
  url: string
  created_at: string
  updated_at: string
}
