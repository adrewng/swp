import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { omit } from 'lodash'
import { Bell, CreditCard, FileText, Heart, LogOut, Package, User, Wallet } from 'lucide-react'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createSearchParams, Link, useLocation, useNavigate } from 'react-router-dom'
import accountApi from '~/apis/account.api'
import { authApi } from '~/apis/auth.api'
import notificationApi from '~/apis/notification.api'
import postApi from '~/apis/post.api'
import { path } from '~/constants/path'
import { AppContext } from '~/contexts/app.context'
import useNotificationQueryConfig from '~/hooks/useNotificationQueryConfig'
import useQueryConfig from '~/hooks/useQueryConfig'
import logoUrl from '~/shared/logo.svg'
import { CategoryType } from '~/types/category.type'
import type { NavNotificationsData, NotificationListConfig } from '~/types/notification.type'
import type { FavNavData } from '~/types/post.type'
import { clearReactQueryCache } from '~/utils/auth'
import Popover from '../Popover'
import FavoriteMenu from './components/FavoriteMenu/FavoriteMenu'
import NotificationMenu from './components/NotificationMenu/NotificationMenu'

export default function NavHeader() {
  const { pathname } = useLocation()
  const normalizedPathname = pathname === path.vehicle || pathname === path.battery ? pathname : path.home
  const [title, setTitle] = useState<string>('')
  const navigate = useNavigate()
  const { isAuthenticated, profile, reset } = useContext(AppContext)
  const queryConfig = useQueryConfig()
  useEffect(() => {
    if (queryConfig.title) {
      setTitle(queryConfig.title)
    } else {
      setTitle('')
    }
  }, [queryConfig.title])

  const onSearch = useCallback(() => {
    navigate({
      pathname: normalizedPathname,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            page: '1',
            limit: '20',
            title
          },
          ['order', 'sort_by']
        )
      ).toString()
    })
  }, [navigate, normalizedPathname, queryConfig, title])
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Cancel tất cả queries đang chạy
      queryClient.cancelQueries()
      // Xóa tất cả cache React Query trong memory
      queryClient.clear()
      // Xóa localStorage của React Query persister
      clearReactQueryCache()
      // Reset profile và isAuthenticated
      reset()
      // Navigate về landing page
      navigate(path.landingPage)
    }
  })
  const handleLogout = () => logoutMutation.mutate()

  // Track xem đã refetch trong lần mở menu này chưa (tránh gọi 2 lần)
  const notificationRefetchRef = useRef(false)
  const favoriteRefetchRef = useRef(false)
  const profileRefetchRef = useRef(false)

  // Notification
  const notificationQueryConfig = useNotificationQueryConfig()
  const {
    data: notificationData,
    isLoading: notificationLoading,
    isFetching: notificationFetching,
    refetch: refetchNotifications
  } = useQuery({
    queryKey: ['notifications', notificationQueryConfig],
    queryFn: () => notificationApi.getNotificationByUser(notificationQueryConfig as NotificationListConfig),
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000, // cache 30 giây - khi mở menu sẽ refetch nếu đã stale
    gcTime: 15 * 60 * 1000, // giữ cache 15 phút
    refetchOnWindowFocus: false,
    enabled: isAuthenticated
  })

  const navNotifData: NavNotificationsData = {
    items: notificationData?.data.data.notifications ?? [],
    allCount: notificationData?.data.data.static.totalCount ?? 0,
    // allCount: 0,
    unreadCount: notificationData?.data.data.static.unreadCount ?? 0,
    // unreadCount: 0,
    isLoading: !!notificationLoading,
    isFetching: !!notificationFetching
  }

  // Favorite Post

  const {
    data: myPosts,
    isLoading: favLoading,
    isFetching: favFetching,
    refetch: refetchFavorites
  } = useQuery({
    queryKey: ['favorite-posts', { page: 1, limit: 5 }],
    queryFn: () => postApi.getFavoritePostByUser({ page: 1, limit: 5 }),
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000, // cache 30 giây - khi mở menu sẽ refetch nếu đã stale
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: isAuthenticated
  })
  const favNavData: FavNavData = {
    items: myPosts?.data.data.posts ?? [],
    isLoading: favLoading,
    isFetching: favFetching,
    total: myPosts?.data.data.count?.all ?? 0
  }

  // Lấy profile để có totalCredit (nhẹ hơn getUserTransaction)
  const {
    data: profileData,
    isFetching: profileFetching,
    refetch: refetchProfile
  } = useQuery({
    queryKey: ['profile'],
    queryFn: accountApi.getProfile,
    enabled: isAuthenticated,
    staleTime: 30 * 1000, // Cache 30 giây - khi mở menu sẽ refetch nếu đã stale
    gcTime: 15 * 60 * 1000, // giữ cache 15 phút
    refetchOnWindowFocus: false
  })
  // Ưu tiên dùng profileData, fallback về profile từ context
  const currentProfile = profileData?.data.data.user || profile
  const walletBalance = currentProfile?.totalCredit ?? '0'

  return (
    <div className='w-full px-5 py-2 border-b border-zinc-200'>
      {/* Header row - logo và buttons */}
      {/* Logo */}
      <div className='flex items-center justify-between w-full cursor-pointer'>
        <div className='flex-shrink-0 justify-self-start w-[120px] h-[60px]'>
          <Link to={path.landingPage} className='inline-flex items-center gap-2'>
            <img
              src={logoUrl}
              alt='EViest'
              className='block select-none object-contain'
              style={{ width: '120px', height: '60px' }}
            />
          </Link>
        </div>

        {/* Search input - hiển thị từ md trở lên */}
        <div className='hidden md:flex justify-center items-center flex-1 ml-5'>
          <div className='w-full max-w-3xl flex justify-center items-center rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm'>
            <button onClick={onSearch}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                />
              </svg>
            </button>

            <label htmlFor='exact-search-desktop' className='sr-only'>
              Tìm kiếm
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              id='exact-search-desktop'
              placeholder='Nhập từ khoá tìm kiếm'
              className='flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none ml-2'
            />
          </div>
        </div>
        {/* Buttons */}
        <div className='justify-self-end flex items-center gap-4 flex-shrink-0'>
          {/* Notification */}
          <div>
            <Popover
              className='flex items-center py-1 cursor-pointer'
              renderProp={<NotificationMenu notificationsData={navNotifData} />}
              onOpenChange={(open) => {
                // Khi mở menu (hover vào), refetch dữ liệu mới
                if (open && isAuthenticated && !notificationFetching && !notificationRefetchRef.current) {
                  notificationRefetchRef.current = true
                  refetchNotifications().finally(() => {
                    // Reset sau khi fetch xong để lần mở tiếp theo vẫn refetch được
                    setTimeout(() => {
                      notificationRefetchRef.current = false
                    }, 100)
                  })
                } else if (!open) {
                  // Reset khi đóng menu
                  notificationRefetchRef.current = false
                }
              }}
            >
              <div
                className='relative'
                aria-label={
                  navNotifData.unreadCount > 0 ? `${navNotifData.unreadCount} thông báo chưa đọc` : 'Thông báo'
                }
                title={navNotifData.unreadCount > 0 ? `${navNotifData.unreadCount} thông báo chưa đọc` : 'Thông báo'}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  // className='size-6  hover:text-black'
                  className='size-6 hover:fill-black text-zinc-700 group-data-[open]:fill-black transition-colors'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0'
                  />
                </svg>

                {/* Badge số chưa đọc */}
                {navNotifData.unreadCount > 0 && (
                  <span
                    className={`pointer-events-none absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] px-1
                    rounded-full bg-blue-600 text-white text-[9px] leading-[16px]
                    text-center font-medium shadow ring-2 ring-white
                    ${navNotifData.isFetching ? 'animate-pulse' : ''}`}
                  >
                    {navNotifData.unreadCount > 99 ? '99+' : navNotifData.unreadCount}
                  </span>
                )}
              </div>
            </Popover>
          </div>
          {/* Favorite Posts */}
          <div>
            <Popover
              className='flex items-center py-1 cursor-pointer'
              renderProp={<FavoriteMenu data={favNavData} />}
              onOpenChange={(open) => {
                // Khi mở menu (hover vào), refetch dữ liệu mới
                if (open && isAuthenticated && !favFetching && !favoriteRefetchRef.current) {
                  favoriteRefetchRef.current = true
                  refetchFavorites().finally(() => {
                    // Reset sau khi fetch xong để lần mở tiếp theo vẫn refetch được
                    setTimeout(() => {
                      favoriteRefetchRef.current = false
                    }, 100)
                  })
                } else if (!open) {
                  // Reset khi đóng menu
                  favoriteRefetchRef.current = false
                }
              }}
            >
              <div
                className='relative'
                aria-label={
                  (favNavData.total ?? favNavData.items.length) > 0
                    ? `${favNavData.total ?? favNavData.items.length} tin đã yêu thích`
                    : 'Tin đã yêu thích'
                }
                title={
                  (favNavData.total ?? favNavData.items.length) > 0
                    ? `${favNavData.total ?? favNavData.items.length} tin đã yêu thích`
                    : 'Tin đã yêu thích'
                }
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='size-6 hover:fill-red-600 text-zinc-700 group-data-[open]:fill-red-600 transition-colors'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                  />
                </svg>

                {(favNavData.total ?? favNavData.items.length) > 0 && (
                  <span
                    className={`pointer-events-none absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] px-1
                      rounded-full bg-slate-700 text-white text-[9px] leading-[16px]
                      text-center font-medium shadow ring-2 ring-white
                      ${favNavData.isFetching ? 'animate-pulse' : ''}`}
                  >
                    {(favNavData.total ?? favNavData.items.length) > 99
                      ? '99+'
                      : (favNavData.total ?? favNavData.items.length)}
                  </span>
                )}
              </div>
            </Popover>
          </div>

          {isAuthenticated && (
            <Link
              to={path.accountPosts}
              className='hidden tablet:inline-block px-4 py-2 rounded-full text-sm border border-black text-black font-medium hover:bg-black/10 transition'
            >
              Quản lí tin
            </Link>
          )}

          {pathname === path.home && (
            <Link
              to={path.post}
              className='py-2 w-23 flex justify-center items-center rounded-full text-sm bg-black text-white font-medium hover:bg-black/80 transition cursor-pointer'
            >
              Đăng tin
            </Link>
          )}
          {pathname === path.vehicle && (
            <Link
              to={`${path.post}?${createSearchParams({ category_type: CategoryType.vehicle }).toString()}`}
              className='py-2 w-23 flex justify-center items-center rounded-full text-sm bg-black text-white font-medium hover:bg-black/80 transition cursor-pointer'
            >
              Bán xe
            </Link>
          )}
          {pathname === path.battery && (
            <Link
              to={`${path.post}?${createSearchParams({ category_type: CategoryType.battery }).toString()}`}
              className='py-2 w-23 flex justify-center items-center rounded-full text-sm bg-black text-white font-medium hover:bg-black/80 transition cursor-pointer'
            >
              Bán pin
            </Link>
          )}
          {isAuthenticated ? (
            <Popover
              className='flex items-center py-1 cursor-pointer'
              onOpenChange={(open) => {
                // Khi mở menu (hover vào), refetch dữ liệu mới
                if (open && isAuthenticated && !profileFetching && !profileRefetchRef.current) {
                  profileRefetchRef.current = true
                  refetchProfile().finally(() => {
                    // Reset sau khi fetch xong để lần mở tiếp theo vẫn refetch được
                    setTimeout(() => {
                      profileRefetchRef.current = false
                    }, 100)
                  })
                } else if (!open) {
                  // Reset khi đóng menu
                  profileRefetchRef.current = false
                }
              }}
              renderProp={
                <div className='w-72 rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden'>
                  {/* Header với thông tin user */}
                  <div className='bg-gradient-to-br from-gray-50 to-white px-4 py-4 border-b border-gray-100'>
                    <div className='flex items-center gap-3 mb-3'>
                      <div className='size-12 rounded-full overflow-hidden ring-2 ring-gray-200 flex-shrink-0'>
                        <img
                          src={currentProfile?.avatar || 'https://picsum.photos/32'}
                          alt={currentProfile?.full_name || 'User'}
                          className='size-full object-cover'
                        />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='font-semibold text-gray-900 truncate'>
                          {currentProfile?.full_name || 'Người dùng'}
                        </div>
                        <div className='text-sm text-gray-500 truncate'>{currentProfile?.email || ''}</div>
                      </div>
                    </div>
                    {/* Số dư ví */}
                    <Link
                      to={path.accountTransaction}
                      className='flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg text-white hover:from-gray-800 hover:to-gray-700 transition-all group'
                    >
                      <Wallet className='w-4 h-4 text-white/80 group-hover:text-white' />
                      <div className='flex-1 min-w-0'>
                        <div className='text-xs text-white/70 mb-0.5'>Số dư ví</div>
                        <div className='text-base font-bold truncate'>
                          {profileFetching ? (
                            <span className='text-white/60'>Đang tải...</span>
                          ) : (
                            <>{Number(walletBalance || 0).toLocaleString('vi-VN')} ₫</>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Menu items */}
                  <div className='py-2'>
                    <Link
                      to={path.accountProfile}
                      className='flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors group'
                    >
                      <User className='w-5 h-5 text-gray-400 group-hover:text-gray-600' />
                      <span className='text-sm font-medium'>Tài khoản của tôi</span>
                    </Link>
                    <Link
                      to={path.accountPosts}
                      className='flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors group'
                    >
                      <FileText className='w-5 h-5 text-gray-400 group-hover:text-gray-600' />
                      <span className='text-sm font-medium'>Bài đăng của tôi</span>
                    </Link>
                    <Link
                      to={path.accountOrders}
                      className='flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors group'
                    >
                      <Package className='w-5 h-5 text-gray-400 group-hover:text-gray-600' />
                      <span className='text-sm font-medium'>Đơn hàng</span>
                    </Link>
                    <Link
                      to={path.accountTransaction}
                      className='flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors group'
                    >
                      <CreditCard className='w-5 h-5 text-gray-400 group-hover:text-gray-600' />
                      <span className='text-sm font-medium'>Giao dịch</span>
                    </Link>
                    <Link
                      to={path.accountFavorite}
                      className='flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors group'
                    >
                      <Heart className='w-5 h-5 text-gray-400 group-hover:text-gray-600' />
                      <span className='text-sm font-medium'>Yêu thích</span>
                    </Link>
                    <Link
                      to={path.accountNotification}
                      className='flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors group'
                    >
                      <Bell className='w-5 h-5 text-gray-400 group-hover:text-gray-600' />
                      <span className='text-sm font-medium'>Thông báo</span>
                    </Link>
                  </div>

                  {/* Divider */}
                  <div className='border-t border-gray-100'></div>

                  {/* Logout */}
                  <div className='py-2'>
                    <button
                      onClick={handleLogout}
                      className='flex items-center gap-3 px-4 py-2.5 w-full text-left text-red-600 hover:bg-red-50 transition-colors group'
                    >
                      <LogOut className='w-5 h-5 text-red-500 group-hover:text-red-600' />
                      <span className='text-sm font-medium'>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              }
            >
              <div className='size-8 rounded-full overflow-hidden ring-1 ring-zinc-200'>
                <img
                  src={profile?.avatar || 'https://picsum.photos/32'}
                  alt='User'
                  className='size-full object-cover'
                />
              </div>
            </Popover>
          ) : (
            <Link
              to={path.login}
              className='py-2 w-27 flex justify-center items-center rounded-full text-sm bg-black text-white font-medium hover:bg-black/80 transition cursor-pointer'
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>

      {/* Search input - hiển thị từ md trở xuống */}
      <div className='md:hidden w-full pb-4'>
        <div className='w-full flex justify-center items-center rounded-full border border-zinc-200 bg-white px-4 py-3 shadow-sm'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
            />
          </svg>
          s
          <label htmlFor='exact-search-mobile' className='sr-only'>
            Tìm kiếm
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            id='exact-search-mobile'
            placeholder='Nhập từ khoá tìm kiếm'
            className='flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none'
          />
        </div>
      </div>
    </div>
  )
}
