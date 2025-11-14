export type PostStatus = 'pending' | 'approved' | 'rejected' | 'verifying' | 'verified' | 'unverified'

export interface PostType {
  id: string
  title: string
  productName: string
  brand: string
  model: string
  price: number
  createdAt: string
  status: PostStatus
  priority: boolean
}

export interface PostListType {
  post: PostType[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface PostListTypeConfig {
  page?: number | string
  limit?: number | string
  search?: string
  year?: string
  status?: Extract<PostStatus, 'Pending' | 'Approved' | 'Rejected'>
  status_verify?: Extract<PostStatus, 'Verifying' | 'Verified' | 'Unverified'>
  priority?: string
}

export interface PostListStatus {
  status: 'all' | 'pending' | 'published' | 'rejected' | 'certified' | 'certifying'
}
