export interface FormContract {
  seller_id: number
  seller_name: string
  buyer_id: number
  buyer_name: string
  product_id: number
  product_name: string
  deposit_amount: number
  vehicle_price: number
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
