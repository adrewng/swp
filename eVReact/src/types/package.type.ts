export interface Package {
  cost: string
  description: string
  duration: number
  feature: string
  id: number
  name: string
  number_of_post: number
  number_of_push: number
  number_of_verify: number
  product_type: string
  service_ref: string
  type: string
  topup_credit: number
  user_total_credit: string
}

export interface Packages {
  packages: Package[]
}

export interface PackageConfig {
  id: string
  product_type: string
}

export interface FormCreatePackage {
  name: string
  description: string
  cost: number
  number_of_post: number
  number_of_push: number
  product_type: string
  feature: string
}

export interface FormUpdatePackage {
  name: string
  description: string
  cost: number
  number_of_post: number
  number_of_push: number
  feature: string
}

export interface PackageByMe {
  cost: string
  created_at: string
  description: string
  duration: number
  expires_at: string
  feature: string
  id: number
  name: string
  number_of_post: number
  number_of_push: number
  order_id: number
  package_id: number
  product_type: string
  purchased_at: string
  remaining_amount: number
  service_id: number
  service_ref: string
  status: string
  total_amount: number
  type: string
  updated_at: string
  used_amount: number
  user_id: number
}
