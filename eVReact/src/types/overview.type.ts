import type { Feedback } from './feedback.type'
import type { PostOverView } from './post.type'
import type { User } from './user.type'

export interface Overview {
  overview: {
    seller: User
    posts?: PostOverView[]
    feedbacks?: Feedback[]
  }
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface OverviewConfig {
  type?: string
  page?: number | string
  limit?: number | string
}
