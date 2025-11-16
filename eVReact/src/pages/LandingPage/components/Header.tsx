import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Bell, CreditCard, FileText, Heart, LogOut, Package, User, Wallet } from 'lucide-react'
import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import accountApi from '~/apis/account.api'
import { authApi } from '~/apis/auth.api'
import Popover from '~/components/Popover'
import { path } from '~/constants/path'
import { AppContext } from '~/contexts/app.context'
import logoUrl from '~/shared/logo.svg'
import { clearReactQueryCache } from '~/utils/auth'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, profile, reset } = useContext(AppContext)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const profileRefetchRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.cancelQueries()
      queryClient.clear()
      clearReactQueryCache()
      reset()
      navigate(path.landingPage)
    }
  })
  const handleLogout = () => logoutMutation.mutate()

  // Profile query để lấy totalCredit
  const {
    data: profileData,
    isFetching: profileFetching,
    refetch: refetchProfile
  } = useQuery({
    queryKey: ['profile'],
    queryFn: accountApi.getProfile,
    enabled: isAuthenticated,
    staleTime: 30 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false
  })

  const currentProfile = profileData?.data.data.user || profile
  const walletBalance = currentProfile?.totalCredit ?? '0'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          <div className='flex-shrink-0 justify-self-start w-[120px] h-[60px] flex-1'>
            <Link to={path.landingPage} className='inline-flex items-center gap-2'>
              <img
                src={logoUrl}
                alt='EViest'
                className='block select-none object-contain'
                style={{ width: '120px', height: '60px' }}
              />
            </Link>
          </div>

          <nav className='hidden md:flex items-center gap-8 flex-1 justify-center'>
            <Link
              to={path.auction}
              className={` py-2 text-sm font-medium transition-colors duration-300 ${
                scrolled ? 'text-neutral-800 hover:text-black' : 'text-white hover:text-yellow-400'
              }`}
            >
              Đấu giá
            </Link>

            <Link
              to={path.home}
              className={` py-2 text-sm font-medium transition-colors duration-300 ${
                scrolled ? 'text-neutral-800 hover:text-black' : 'text-white hover:text-yellow-400'
              }`}
            >
              Tin đăng
            </Link>
            <Link
              to={path.pricing}
              className={` py-2 text-sm font-medium transition-colors duration-300 ${
                scrolled ? 'text-neutral-800 hover:text-black' : 'text-white hover:text-yellow-400'
              }`}
            >
              Gói tin
            </Link>
          </nav>

          <div className='hidden md:flex items-center gap-3 flex-1 justify-end'>
            <Link
              to={path.post}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                scrolled
                  ? 'bg-black text-white hover:bg-neutral-800'
                  : 'bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20'
              }`}
            >
              Đăng tin ngay
            </Link>

            {isAuthenticated ? (
              <div className='relative'>
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
                              src={currentProfile?.avatar}
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
                    <img src={profile?.avatar} alt='User' className='size-full object-cover' />
                  </div>
                </Popover>
              </div>
            ) : (
              <Link
                to={path.login}
                className={`px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                  scrolled ? 'text-neutral-800 hover:text-black' : 'text-white hover:text-yellow-400'
                }`}
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
