import type { User } from './user.type'
export type SessionStatus = 'draft' | 'verified' | 'live' | 'ended' | 'cancelled'
export interface Auction {
  id: number
  product_id: number
  seller_id: number
  seller_name: string
  starting_price: string
  original_price: string
  target_price: string
  deposit: string
  winner_id: number
  winner_name: string
  winning_price: string
  duration: number
  step: string
  note: string
  status: string
  start_at: string
  end_at: string
  image: string
  title: string
  location: string
  contract_status: string
  has_report: boolean
  contract_url: string
}
export interface AuctionList {
  auctions: Auction[]
  totalAuctions: number
  totalMembers: number
}

export interface ReportAuction {
  auction_id: number
  user_id: number
  reason: string
  fault_type: 'seller' | 'winner'
}

export interface AuctionType {
  id: number
  product_id: number

  startingBid: number // giá khỏi điểm
  originalPrice: number
  buyNowPrice: number // giá mua ngay
  topBid?: number | null

  bidIncrement: number // bước nhảy tối thiểu
  deposit: number // tiền cọc cần thanh toán trước khi tham gia

  winner?: User | null
  winning_price?: string | number | null // decimal(15,2)

  startAt?: string
  endAt?: string
  duration?: string | number

  isVerify?: boolean

  note?: string // ghi chú,
  title?: string

  status?: SessionStatus
  currentPrice?: number | null
  bid_count?: number
}

export type Participation = {
  auction: AuctionType
  result?: 'pending' | 'win' | 'lose'
}

export interface AuctionUserList {
  auctions: Participation[] | AuctionType[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
  static: {
    ownAuctions: number
    ownLiveAuctions: number
    participationAuctions: number
    participationLiveAuctions: number
  }
}
