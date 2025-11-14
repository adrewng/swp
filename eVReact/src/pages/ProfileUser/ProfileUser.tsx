import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { createSearchParams, useLocation, useNavigate, useParams } from 'react-router-dom'
import accountApi from '~/apis/account.api'
import useOverviewQueryConfig from '~/hooks/useOverviewQueryConfig'
import { getIdFromNameId } from '~/utils/util'
import Feedback from './components/Feedback'
import ProfileCard from './components/ProfileCard'
import ProfileInfo from './components/ProfileInfo'
import ProfilePost from './components/ProfilePost'

export default function ProfileUser() {
  const { nameid } = useParams()
  const id = getIdFromNameId(String(nameid))
  const [activeTab, setActiveTab] = useState<'feedback' | 'post' | 'info'>('feedback')
  const navigate = useNavigate()

  const queryConfig = useOverviewQueryConfig()
  const location = useLocation()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['over-view', id, queryConfig],
    enabled: !!id,
    queryFn: () => accountApi.getInfoUser(id, queryConfig),
    placeholderData: keepPreviousData
  })

  const handleTabClick = (key: 'feedback' | 'post' | 'info') => {
    setActiveTab(key)
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        ...queryConfig,
        type: key,
        page: '1'
      }).toString()
    })
  }

  const seller = data?.data.data.overview.seller
  const posts = data?.data.data.overview.posts ?? []
  const feedbacks = data?.data.data.overview.feedbacks ?? []
  const pagination = data?.data.data.pagination ?? {}

  return (
    <div className='min-h-screen bg-white'>
      {/* header */}
      <div className='h-48 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900' />

      <div className='mx-auto max-w-6xl px-4 pb-16'>
        {/* Loading skeleton cho ProfileCard */}
        {isLoading ? (
          <div className='-mt-24 mb-12'>
            <div className='rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm'>
              <div className='flex flex-col gap-8 lg:flex-row lg:items-start'>
                <div className='flex flex-col items-center lg:items-start'>
                  <div className='h-32 w-32 rounded-full bg-neutral-200 animate-pulse' />
                  <div className='mt-4 h-6 w-40 rounded bg-neutral-200 animate-pulse' />
                  <div className='mt-2 h-5 w-28 rounded bg-neutral-100 animate-pulse' />
                </div>
                <div className='flex-1 grid grid-cols-2 gap-4 lg:grid-cols-4'>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className='rounded-2xl border border-neutral-200 bg-neutral-50 p-4'>
                      <div className='h-4 w-24 rounded bg-neutral-200 animate-pulse' />
                      <div className='mt-2 h-7 w-16 rounded bg-neutral-200 animate-pulse' />
                      <div className='mt-1 h-3 w-20 rounded bg-neutral-100 animate-pulse' />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : seller ? (
          <ProfileCard profile={seller} />
        ) : (
          <div className='-mt-24 mb-12 text-center text-neutral-500'>Không tìm thấy người bán.</div>
        )}

        {/* Tabs */}
        <div className='mb-8 border-b border-neutral-200'>
          <div className='flex gap-8'>
            {[
              { key: 'feedback', label: 'Đánh giá', count: seller?.totalFeedbacks ?? 0 },
              { key: 'post', label: 'Bài đăng đang hiển thị', count: seller?.totalActivePosts ?? 0 },
              { key: 'info', label: 'Thông tin' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabClick(tab.key as typeof activeTab)}
                className={`relative pb-4 text-sm font-medium transition-colors ${
                  activeTab === tab.key ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'
                }`}
                disabled={isLoading}
              >
                {tab.label}
                {tab.count !== undefined && <span className='ml-1.5 text-xs'>({tab.count})</span>}
                {activeTab === tab.key && <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900' />}
              </button>
            ))}
            {isFetching && !isLoading && (
              <span className='ml-auto text-xs text-neutral-400 animate-pulse'>Đang cập nhật…</span>
            )}
          </div>
        </div>

        {/* Tab Content */}
        {isLoading ? (
          // Skeleton cho content
          <div className='space-y-4'>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className='h-24 rounded-2xl border border-neutral-200 bg-white p-6 animate-pulse' />
            ))}
          </div>
        ) : (
          <>
            {activeTab === 'feedback' && !!pagination && !!seller && (
              <Feedback pagination={pagination} queryConfig={queryConfig} seller={seller} feedbacks={feedbacks} />
            )}
            {activeTab === 'post' && <ProfilePost queryConfig={queryConfig} pagination={pagination} posts={posts} />}
            {activeTab === 'info' && <ProfileInfo seller={seller!} />}
          </>
        )}
      </div>
    </div>
  )
}
