import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import auctionApi from '~/apis/auction.api'
import type { Auction } from '~/types/auction.type'
import AuctionCard from './components/AuctionCard'

export default function AllAuctionList() {
  const { data: allAuctionData } = useQuery({
    queryKey: ['all-auction'],
    queryFn: auctionApi.getAllAuction
  })

  const allAuction = allAuctionData?.data.data.auctions
  // const pageLoading = false
  // const pageData = { auctions: allAuction }

  return (
    <div className='min-h-screen text-zinc-900 pb-8 pt-8 mx-auto max-w-7xl px-4 py-6'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=' mb-12 space-y-3'
      >
        <h1 className='text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900'>Phiên Đấu Giá Nổi Bật</h1>
        <p className='text-zinc-600 max-w-2xl  text-lg'>
          Khám phá những phiên đấu giá xe điện và pin năng lượng hấp dẫn nhất hôm nay. Đặt giá thầu của bạn để giành
          được sản phẩm ưa thích!
        </p>
        <hr className='my-4 border-zinc-900 ' />
      </motion.div>
      <motion.section
        initial={false}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
        className='min-w-0'
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 pr-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
          {!allAuction
            ? Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                  key={`s-${index}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                  className='group'
                >
                  <div className='flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white h-[300px]' />
                </motion.div>
              ))
            : allAuction.map((auction: Auction) => (
                <motion.div
                  key={auction.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                  className='group'
                >
                  <div className='flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow duration-300 hover:shadow-lg'>
                    <AuctionCard auction={auction} />
                  </div>
                </motion.div>
              ))}
        </div>
      </motion.section>
    </div>
  )
}
