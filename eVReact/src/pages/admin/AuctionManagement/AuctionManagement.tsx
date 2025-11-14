// import { useState } from 'react'
// import AuctionCharts from './components/AuctionCharts'
import { useQuery } from '@tanstack/react-query'
import auctionApi from '~/apis/auction.api'
import AuctionsTable from './components/AuctionsTable'
// import FilterBar from './components/FilterBar'
import StatsOverview from './components/StatsOverview'

export default function AuctionManagement() {
  // const [filters, setFilters] = useState({
  //   status: 'all',
  //   search: '',
  //   sortBy: 'recent'
  // })

  const { data: allAuctionData, isLoading } = useQuery({
    queryKey: ['all-auction'],
    queryFn: auctionApi.getAllAuction
  })
  const auctions = allAuctionData?.data?.data.auctions
  const totalAuctions = allAuctionData?.data.data.totalAuctions
  const totalMembers = allAuctionData?.data.data.totalMembers

  if (isLoading)
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='flex space-x-2'>
          <span className='w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]'></span>
          <span className='w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]'></span>
          <span className='w-3 h-3 bg-blue-500 rounded-full animate-bounce'></span>
        </div>
      </div>
    )

  return (
    <main className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex-1'>
      {/* Content */}
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        {/* Stats Overview */}
        <StatsOverview totalAuctions={totalAuctions} totalMembers={totalMembers} />

        {/* Filter & Table Section */}
        <div className='mt-8 space-y-6'>
          <AuctionsTable auctions={auctions} />
        </div>
      </div>
    </main>
  )
}
