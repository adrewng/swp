import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import auctionApi from '~/apis/auction.api'
import Pagination from '~/components/Pagination'
import { TableSkeleton } from '~/components/skeleton'
import useQueryConfig from '~/hooks/useQueryConfig'
import type { AuctionType, Participation } from '~/types/auction.type'
import ParticipationsTable from './components/ParticipationsTable'
import SessionsTable from './components/SessionTable/SessionTable'

export default function AccountAuction() {
  const [tab, setTab] = useState<'own' | 'joined'>('own')
  const queryConfig = useQueryConfig()
  const { data: myAuction, isLoading: loadingOwn } = useQuery({
    queryKey: ['auction', 'my-sessions'],
    queryFn: () => auctionApi.getMySessions()
  })
  const { data: joinedAuction, isLoading: loadingJoined } = useQuery({
    queryKey: ['auction', 'participations'],
    queryFn: () => auctionApi.getMyParticipations()
  })

  const mySessions = myAuction?.data.data
  const participates = joinedAuction?.data?.data

  const stats = mySessions?.static && participates?.static
  return (
    <div className='flex-1 bg-white min-h-screen'>
      <div className='max-w-7xl mx-auto p-6 space-y-6'>
        <div className='mb-6'>
          <div className='text-xs uppercase tracking-wider text-gray-500'>Tài khoản của tôi</div>
          <h1 className='text-3xl font-bold tracking-tight'>Quản lý đấu giá</h1>
        </div>
        <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
          <div className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
            <div className='text-sm text-gray-500'>Phiên của tôi</div>
            <div className='mt-1 text-2xl font-semibold'>{stats?.ownAuctions}</div>
            <div className='mt-1 text-xs text-gray-500'>Đang diễn ra: {stats?.ownLiveAuctions}</div>
          </div>
          <div className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
            <div className='text-sm text-gray-500'>Đã tham gia</div>
            <div className='mt-1 text-2xl font-semibold'>{stats?.participationAuctions}</div>
            <div className='mt-1 text-xs text-gray-500'>Đang diễn ra: {stats?.participationLiveAuctions}</div>
          </div>
        </div>
        <div className='flex items-center justify-start gap-5'>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setTab('own')}
              className={`rounded-xl px-3 py-2 text-sm ring-1 ${
                tab === 'own' ? 'bg-gray-900 text-white ring-gray-900' : 'bg-white text-gray-700 ring-gray-200'
              }`}
            >
              Phiên của tôi
            </button>
          </div>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setTab('joined')}
              className={`rounded-xl px-3 py-2 text-sm ring-1 ${
                tab === 'joined' ? 'bg-gray-900 text-white ring-gray-900' : 'bg-white text-gray-700 ring-gray-200'
              }`}
            >
              Đã tham gia
            </button>
          </div>
        </div>
        <div className='mt-4'>
          {tab === 'own' ? (
            loadingOwn ? (
              <TableSkeleton rows={6} cols={5} />
            ) : (
              <SessionsTable rows={mySessions?.auctions as AuctionType[]} emptyText='Chưa có phiên nào.' />
            )
          ) : loadingJoined ? (
            <TableSkeleton rows={6} cols={5} />
          ) : (
            <ParticipationsTable
              rows={participates?.auctions as Participation[]}
              emptyText='Chưa tham gia phiên nào.'
            />
          )}
        </div>
        <div className='mt-4 flex items-center justify-center text-sm text-gray-500'>
          <Pagination pageSize={1} queryConfig={queryConfig} />
        </div>
      </div>
    </div>
  )
}
