import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Battery, Car, CheckCircle2, Edit, Eye, Gavel, MoreVertical, Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { createSearchParams, Link } from 'react-router-dom'
import postApi from '~/apis/post.api'
import PaginationAdmin from '~/components/Pagination/PaginationAdmin'
import { PostCardSkeleton } from '~/components/skeleton'
import { BATTERY_HEALTH_OPTIONS, CAPACITY_OPTIONS, MILEAGE_OPTIONS } from '~/constants/options'
import { path } from '~/constants/path'
import { tabs } from '~/constants/post'
import useQueryConfig from '~/hooks/useQueryConfig'
import { CategoryType } from '~/types/category.type'
import type { BatteryType, PostStatus, ProductListConfig, VehicleType } from '~/types/post.type'
import { labelFromOptions } from '~/utils/option'
import { formatCurrencyVND, generateNameId } from '~/utils/util'

export default function AccountPost() {
  const [activeTab, setActiveTab] = useState('all')
  const qc = useQueryConfig()
  const queryConfig = { ...qc, limit: '10' }
  const queryClient = useQueryClient()

  const { data: postData, isLoading } = useQuery({
    queryKey: ['post-me', queryConfig],
    queryFn: () => postApi.getPostByMe(queryConfig as ProductListConfig),
    placeholderData: keepPreviousData
  })
  const accountPostData = postData?.data.data
  // Mutation để đánh dấu bài đăng là "đã bán"
  const markAsSoldMutation = useMutation({
    mutationFn: (postId: string | number) => postApi.soldPost(postId),
    onSuccess: () => {
      // Invalidate và refetch tất cả queries có prefix 'post-me'
      queryClient.invalidateQueries({ queryKey: ['post-me'], exact: false })
      queryClient.refetchQueries({ queryKey: ['posts'], exact: false })
    }
  })

  const handleMarkAsSold = (postId: string | number) => {
    if (window.confirm('Bạn có chắc chắn muốn đánh dấu bài đăng này là "Đã bán"?')) {
      markAsSoldMutation.mutate(postId)
    }
  }

  return (
    <div className='flex-1 bg-white min-h-screen'>
      <div className='max-w-7xl mx-auto p-6 space-y-6'>
        {/* Header */}
        <div className='flex justify-between items-start'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900 mb-2'>Bài đăng của bạn</h1>
            <p className='text-gray-600'>Quản lý danh sách các bài đăng về xe và pin của bạn</p>
          </div>
          <div className='flex items-center gap-3'>
            <Link
              to={path.post}
              className='flex items-center gap-2 px-5 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium shadow-lg transition-all'
            >
              <Plus className='w-5 h-5' /> Tạo bài đăng mới
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className='bg-white border border-gray-200 rounded-2xl p-2 grid grid-cols-8 gap-2'>
          {tabs.map((tab) => (
            <Link
              to={{
                pathname: path.accountPosts,
                search: createSearchParams({
                  [tab.param]: tab.statusQuery
                }).toString()
              }}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className='flex items-center justify-center gap-2'>
                <span>{tab.label}</span>
                <span
                  className={`ml-1 text-xs rounded-full px-2 py-0.5 font-semibold ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'
                  }`}
                >
                  {accountPostData?.count?.[tab.id as PostStatus | 'all'] ?? 0}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Post List */}
        <div className='space-y-4'>
          {/* Loading */}
          {isLoading && (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </>
          )}

          {/* Rỗng */}
          {!isLoading && (accountPostData === undefined || accountPostData.posts.length === 0) && (
            <div className='text-center py-20 bg-white border border-gray-200 rounded-2xl'>
              <div className='w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-5'>
                <Search className='w-10 h-10 text-gray-400' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>Không tìm thấy bài đăng nào</h3>
              <p className='text-gray-600 mb-6'>Hãy điều chỉnh lại tìm kiếm hoặc tạo bài đăng mới.</p>
              <Link
                to={path.post}
                className='px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all'
              >
                Tạo bài đăng mới
              </Link>
            </div>
          )}

          {/* Có dữ liệu */}
          {!isLoading &&
            accountPostData?.posts.map((post) => (
              <div
                key={post.id}
                className='bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300'
              >
                <div className='flex gap-4 p-5'>
                  {/* Thumbnail */}
                  <div className='relative w-56 h-40 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100'>
                    <img src={post.product.image} alt={post.title} className='w-full h-full object-cover' />

                    {/* Status badge (góc trái trên) */}
                    <div className='absolute top-3 left-3'>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur ${
                          post.status === 'approved'
                            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                            : post.status === 'pending'
                              ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                              : post.status === 'rejected' || post.status === 'banned'
                                ? 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
                                : 'bg-gray-100 text-gray-700 ring-1 ring-gray-200'
                        }`}
                      >
                        {post.status === 'approved'
                          ? 'Đã đăng'
                          : post.status === 'pending'
                            ? 'Đang chờ'
                            : post.status === 'rejected'
                              ? 'Từ chối'
                              : post.status === 'auctioning'
                                ? 'Đang đấu giá'
                                : post.status === 'auctioned'
                                  ? 'Đã đấu giá'
                                  : post.status === 'sold'
                                    ? 'Đã bán'
                                    : post.status === 'banned'
                                      ? 'Đã cấm'
                                      : 'Không rõ'}
                      </span>
                    </div>

                    {/* Type badge (góc phải dưới) */}
                    <div className='absolute bottom-3 right-3'>
                      <div className='bg-gray-900/80 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 font-medium shadow'>
                        {post.product.category.typeSlug === CategoryType.vehicle ? (
                          <>
                            <Car className='w-3.5 h-3.5' /> Xe
                          </>
                        ) : (
                          <>
                            <Battery className='w-3.5 h-3.5' /> Pin
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className='flex-1 flex flex-col justify-between'>
                    <div>
                      <div className='flex items-start justify-between'>
                        <div className='flex-1'>
                          {/* Tiêu đề + chip trạng thái nhỏ */}
                          <div className='flex items-center gap-2 mb-1'>
                            <h3 className='font-semibold text-xl text-gray-900 line-clamp-1'>{post.title}</h3>
                            <span className='hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ring-1 bg-white text-gray-700 ring-gray-200'>
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  post.status === 'approved'
                                    ? 'bg-emerald-500'
                                    : post.status === 'pending'
                                      ? 'bg-amber-500'
                                      : post.status === 'rejected' || post.status === 'banned'
                                        ? 'bg-rose-500'
                                        : 'bg-gray-400'
                                }`}
                              />
                              {post.status === 'approved'
                                ? 'Đã đăng'
                                : post.status === 'pending'
                                  ? 'Đang chờ'
                                  : post.status === 'rejected'
                                    ? 'Từ chối'
                                    : post.status === 'draft'
                                      ? 'Nháp'
                                      : post.status === 'auctioning'
                                        ? 'Đang đấu giá'
                                        : post.status === 'auctioned'
                                          ? 'Đã đấu giá'
                                          : post.status === 'sold'
                                            ? 'Đã bán'
                                            : post.status === 'banned'
                                              ? 'Đã cấm'
                                              : 'Không rõ'}
                            </span>
                          </div>

                          <div className='flex items-center gap-3 text-sm text-gray-600'>
                            <span className='flex items-center gap-1'>
                              <span className='font-medium'>ID:</span> {post.id}
                            </span>
                            <span>•</span>
                            <span>{post.product.category.name}</span>
                            <span>•</span>
                            <span className='flex items-center gap-1'>📍 {post.product.address}</span>
                          </div>
                        </div>
                        <button className='p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors'>
                          <MoreVertical className='w-5 h-5' />
                        </button>
                      </div>

                      <div className='flex items-center gap-6 mt-4 text-sm'>
                        <div className='flex items-center gap-2'>
                          <span className='font-bold text-emerald-600 text-xl'>
                            {formatCurrencyVND(post.product.price)}
                          </span>
                        </div>

                        {post.product.category.typeSlug === CategoryType.vehicle && (
                          <>
                            <span className='text-gray-300'>|</span>
                            <span className='text-gray-600'>
                              <span className='font-medium'>🚗</span>
                              <span>{labelFromOptions(MILEAGE_OPTIONS, (post.product as VehicleType).mileage)}</span>
                            </span>
                          </>
                        )}

                        {post.product.category.typeSlug === CategoryType.battery && (
                          <>
                            <span className='text-gray-300'>|</span>
                            <span className='text-gray-600'>
                              <span className='font-medium'>⚡</span>{' '}
                              <span>{labelFromOptions(CAPACITY_OPTIONS, (post.product as BatteryType).capacity)}</span>
                            </span>
                          </>
                        )}

                        <span className='text-gray-300'>|</span>
                        <span className='text-gray-600 flex items-center gap-1'>
                          <span className='font-medium'>🔋</span>
                          <span
                            className={`font-semibold ${
                              post.product.health >= '90' ? 'text-emerald-600' : 'text-amber-600'
                            }`}
                          >
                            {labelFromOptions(BATTERY_HEALTH_OPTIONS, post.product.health)}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className='flex items-center justify-between mt-4 pt-4 border-t border-gray-100'>
                      {/* Time */}
                      <div className='flex items-center gap-4 text-sm text-gray-500'>
                        <span>•</span>
                        <span>Đăng ngày {new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
                      </div>

                      {/* Actions */}
                      <div className='flex items-center gap-2'>
                        {/* Xem chi tiết sản phẩm */}
                        <Link
                          to={`${path.post}/${post.product.id}`}
                          className='flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-sm font-medium transition-all'
                        >
                          <Eye className='w-4 h-4' /> Xem
                        </Link>

                        {/*  Nộp lại */}
                        {post.allow_resubmit && (
                          <Link
                            to={`/update-rejected/${generateNameId({ name: post.title, id: post.id })}`}
                            className='flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all
                          bg-gray-100 hover:bg-gray-200 text-gray-900'
                            title='Chỉnh sửa bài đăng'
                          >
                            <Edit className='w-4 h-4' /> Nộp lại
                          </Link>
                        )}

                        {/* Đánh dấu đã bán - chỉ hiển thị khi status là approved */}
                        {post.status === 'approved' && (
                          <button
                            onClick={() => handleMarkAsSold(post.id)}
                            disabled={markAsSoldMutation.isPending}
                            className='flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                          >
                            <CheckCircle2 className='w-4 h-4' /> Đã bán
                          </button>
                        )}

                        {/* Yêu cầu đấu giá */}
                        {post.status === 'approved' ? (
                          <Link
                            to={`/request-auction/${generateNameId({ name: post.title, id: post.id })}`}
                            className='flex items-center gap-1.5 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl text-sm font-medium transition-all'
                          >
                            <Gavel className='w-4 h-4' /> Yêu cầu đấu giá
                          </Link>
                        ) : (
                          <span
                            aria-disabled
                            className='flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-400 opacity-60 cursor-not-allowed select-none'
                          >
                            <Gavel className='w-4 h-4' /> Yêu cầu đấu giá
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {accountPostData !== undefined && accountPostData.posts.length !== 0 && (
            <PaginationAdmin pageSize={accountPostData.pagination.page_size} queryConfig={queryConfig} />
          )}
        </div>
      </div>
    </div>
  )
}
