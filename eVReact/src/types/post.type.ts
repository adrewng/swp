import type { CategoryChild, CategoryType } from './category.type'
import type { User } from './user.type'

export interface PostType {
  id: number
  title: string
  priority: number
  created_at: string
  updated_at: string
  isFavorite?: boolean
  product: VehicleType | BatteryType
  end_date?: string
  seller?: User
  reviewer?: User
  reviewed_by?: string
  status?: string
  allow_resubmit?: boolean
  status_verify?: string
  favorite_at?: string
  ai?: {
    min_price: number
    max_price: number
  }
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
  seats: number | string // số chỗ ngồi
  image: string // ảnh bìa
  images: string[] // danh sách ảnh chi tiết,
  warranty: string // bảo hành
  color: string // màu sắc,
  health: string
  rejected_reason?: string
  previousOwners?: number
  capacity?: number
  voltage?: number
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
  color: string // màu sắc
  rejected_reason?: string
  previousOwners?: number
}

export interface PostListType {
  posts: PostType[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
  count?: {
    all?: number
    pending?: number
    approved?: number
    rejected?: number
    auctioning?: number
    auctioned?: number
    sold?: number
    expired?: number
    banned?: number
  }
}
export interface FavNavData {
  items: PostType[]
  isLoading: boolean
  isFetching: boolean
  total?: number
}

export type PostStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'auctioning'
  | 'auctioned'
  | 'sold'
  | 'expired'
  | 'banned'
export interface ProductListConfig {
  page?: number | string
  limit?: number | string
  color?: string
  title?: string
  warranty?: string
  sort_by?: 'recommend' | 'price' | 'created_at'
  order?: 'asc' | 'desc'
  exclude?: string
  power?: string
  mileage?: string
  seat?: string
  health?: string
  voltage?: string
  capacity?: string
  price_max?: number | string
  price_min?: number | string
  category_type?: Omit<CategoryType, 'notFound' | 'all'>
  category_id?: string
  status?:
    | Extract<PostStatus, 'pending' | 'approved' | 'rejected' | 'auctioning' | 'auctioned' | 'sold' | 'banned'>
    | 'all'
  // status_verify?: Extract<PostStatus, 'verifying' | 'verified' | 'unverified'>
}

export interface PostOverView {
  id: number
  title: string
  product: {
    price: string
    image: string
  }
}

export interface RelatedPost {
  id: number
  title: string
  price: string
  brand: string
  model: string
  year: number
  address: string
  status: string
  category_name: string
  category_type: string
  image: string
  similarity_score: number
  seller: {
    id: number
    name: string
    rating: number
  }
  created_at: string
}

export interface RelatedPostList {
  current_product: {
    id: number
    category_id: number
    price: number | string
  }
  total: number
  related_posts: RelatedPost[]
}

export interface PostStats {
  total_post: number
  vehicle_post: number
  battery_post: number
  pending_post: number
  approved_post: number
  rejected_post: number
}
