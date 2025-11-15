import type { Auction, AuctionList, AuctionType, AuctionUserList, ReportAuction } from '~/types/auction.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const URL_CREATE_AUCTION_REQUEST = 'api/payment/auction-fee'
const URL_GET_OWN_AUCTION = 'api/auction/own'
const URL_GET_PARTICIPATED_AUCTION = 'api/auction/participated'

const auctionApi = {
  getAllAuction() {
    return http.get<SuccessResponse<AuctionList>>('/api/auction/get-all')
  },
  getActiveAuction() {
    return http.get<SuccessResponse<AuctionList>>('/api/auction/get-all-active')
  },
  getAuctionByProduct(product_id: number) {
    return http.get<SuccessResponse<Auction>>('/api/auction/get-by-product', {
      params: { product_id }
    })
  },
  payDeposit(auction_id: number) {
    const body = {
      auction_id: auction_id
    }
    return http.post('/api/payment/auction-deposit', body)
  },
  startAuction(auctionId: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return http.post<SuccessResponse<any>>('/api/auction/start', { auctionId })
  },
  createAuctionRequest(body: AuctionType) {
    return http.post<SuccessResponse<{ data: AuctionType }>>(URL_CREATE_AUCTION_REQUEST, body)
  },
  getMySessions() {
    return http.get<SuccessResponse<AuctionUserList>>(URL_GET_OWN_AUCTION)
  },
  getMyParticipations() {
    return http.get<SuccessResponse<AuctionUserList>>(URL_GET_PARTICIPATED_AUCTION)
  },
  verifyAuctionByAdmin(auctionId: number, duration: number) {
    return http.post('/api/admin/verify-auction', {
      auctionId,
      duration
    })
  },
  buyNow(auctionId: number) {
    return http.post<SuccessResponse<{ auction: Auction }>>('/api/auction/buy-now', { auctionId })
  },
  createReportAuction(formData: ReportAuction) {
    return http.post('/api/admin/report', formData)
  }
}

export default auctionApi
