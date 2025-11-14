import type { ORDERSTATUS, OrderType } from '~/constants/order'
import type { AuctionType } from './auction.type'
import type { PostType } from './post.type'
import type { Service } from './service.type'
import type { User } from './user.type'

export interface Order {
  id: number
  type: OrderType
  status: string
  tracking: keyof typeof ORDERSTATUS
  price: string | number
  viewingAppointment?: {
    address: string
    time: string
    contactName?: string
    contactPhone?: string
    status?: 'scheduled' | 'completed' | 'no_show' | 'canceled'
    notes?: string
  }
  handoverAppointment?: {
    address: string
    time: string
    contactName?: string
    contactPhone?: string
    status?: 'scheduled' | 'completed' | 'no_show' | 'canceled'
    notes?: string
  }
  created_at: string
  updated_at: string
  buyer?: Pick<User, 'id' | 'full_name' | 'email' | 'phone'>
  seller?: Pick<User, 'id' | 'full_name' | 'email' | 'phone'>
  post?: PostType
  service?: Service
  auction?: AuctionType
  contract?: {
    contract_code: string
    id: number
    status: string
    url: string
  }
}

export interface OrderList {
  orders: Order[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
  static: {
    total: number
    total_pending: number | string
    total_paid: number | string
    total_spent: number
  }
}

export interface OrderListConfig {
  page?: number | string
  limit?: number | string
  tracking?: keyof typeof ORDERSTATUS
  type?: OrderType
  orderId?: number | string
}
