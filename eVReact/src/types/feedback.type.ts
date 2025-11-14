export interface FeedbackType {
  contract_id: number
  seller_id: number
  buyer_id: number
  rating: number
  comment: string
}

export interface Feedback {
  createdAt: string
  id: number
  start: number
  text: string
  title: string
  user: {
    avatar: string
    full_name: string
    id: number
  }
}
