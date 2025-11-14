export interface Service {
  id: number
  name: string
  type?: string
  description: string
  price: string
  userUsageCount?: number
  feature?: string
  sevice_ref?: {
    service_id: number
    name: string
    amount?: number
  }
}

export interface ServiceList {
  version: string
  services: Service[]
}
