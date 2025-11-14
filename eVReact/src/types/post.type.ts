import type { CategoryChild, CategoryType } from './category.type'
import type { User } from './user.type'

export interface PostDetailType {
  id: number
  title: string
  priority: number
  created_at: string
  updated_at: string
  product: VehicleType | BatteryType
  end_date?: string
  seller?: User
  reviewer?: User
  reviewed_by?: string
}

export interface VehicleType {
  id: number
  brand: string
  model: string
  power: string // công suất (W, kW…)
  price: string
  address: string
  description: string
  category: CategoryChild
  mileage: string // số km đã đi
  year: number // đời xe
  seats: number // số chỗ ngồi
  image: string // ảnh bìa
  images: string[] // danh sách ảnh chi tiết,
  warranty: string // bảo hành
  color: string // màu sắc
}

export interface BatteryType {
  id: number
  brand: string
  model: string
  capacity: string
  price: string
  address: string
  description: string
  category: CategoryChild
  voltage: string // điện áp (V)
  health: string // tình trạng pin
  year: number
  image: string
  images: string[]
  warranty: string // bảo hành
}

export interface PostType {
  id: number
  title: string
  description: string
  created_at: string
  updated_at: string
  priority: number
  product: {
    brand: string
    model: string
    year: number
    price: string
    address: string
    images: string[]
    image: string
    category: CategoryChild
  }
}
export interface PostListType {
  posts: PostType[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface ProductListConfig {
  page?: number | string
  limit?: number | string
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  exclude?: string
  rating_filter?: number | string
  price_max?: number | string
  price_min?: number | string
  name?: string
  category_type?: Omit<CategoryType, 'notFound' | 'all'>
  category_id?: string
}
