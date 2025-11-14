export interface Service {
  id: number
  name: string
  description: string
  price: string
  userUsageCount: number
}

export interface ServiceList {
  version: string
  services: Service[]
}
