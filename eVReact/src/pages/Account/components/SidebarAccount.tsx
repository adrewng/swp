/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Bell, ChevronDown, ChevronRight, Gavel, LogOutIcon, Newspaper, ShoppingCart, UserPen } from 'lucide-react'
import { useContext, useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { authApi } from '~/apis/auth.api'
import { path } from '~/constants/path'
import { AppContext } from '~/contexts/app.context'
import { clearReactQueryCache } from '~/utils/auth'

const accountItems = [
  { label: 'Thông báo', icon: Bell, path: path.accountNotification, children: [] },
  {
    label: 'Quản lí trang cá nhân',
    icon: UserPen,
    path: path.accountProfile,
    children: [
      { label: 'Trang cá nhân', path: path.accountProfile },
      { label: 'Biến động số dư', path: path.accountTransaction }
    ]
  },
  { label: 'Quản lí đơn hàng', icon: ShoppingCart, path: path.accountOrders, children: [] },
  {
    label: 'Quản lí bài đăng',
    icon: Newspaper,
    path: path.accountPosts,
    children: [
      { label: 'Bài đăng của bạn', path: path.accountPosts },
      { label: 'Tin yêu thích', path: path.accountFavorite }
    ]
  },
  { label: 'Quản lí đấu giá', icon: Gavel, path: path.accountAuction, children: [] }
] as const

export default function SidebarAccount() {
  const { profile, reset } = useContext(AppContext)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [openState, setOpenState] = useState<Record<string, boolean>>({})
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

  const isActiveParent = (item: (typeof accountItems)[number]) => {
    if (item.children.length === 0) return pathname === item.path
    return item.children.some((c) => pathname === c.path || pathname.startsWith(c.path + '/'))
  }

  useEffect(() => {
    const activeParent = accountItems.find((it) => it.children.length > 0 && isActiveParent(it))
    if (activeParent) {
      setOpenState(() => ({ [activeParent.path]: true }))
    } else {
      setOpenState({})
    }
  }, [pathname])

  const parentActiveMap = useMemo(() => {
    const m: Record<string, boolean> = {}
    for (const it of accountItems) m[it.path] = isActiveParent(it)
    return m
  }, [pathname])

  // useEffect(() => {
  //   console.log('pathname:', pathname)
  //   console.log('parentActiveMap:', parentActiveMap)
  //   for (const it of accountItems) {
  //     const parentActive = parentActiveMap[it.path]
  //     const hasChildren = it.children.length > 0
  //     const isOpen = hasChildren && (openState[it.path] ?? parentActive)
  //     console.log(
  //       `- ${it.label}: parentActive=${parentActive}, openState[${it.path}]=${openState[it.path]}, isOpen=${isOpen}`
  //     )
  //   }
  // }, [pathname, parentActiveMap, openState])
  return (
    <div className='h-full bg-white border-r border-gray-200 flex flex-col'>
      {/* User */}
      <div className='p-6 border-b border-gray-200'>
        <div className='flex items-center gap-3'>
          <img
            src={profile?.avatar || 'https://picsum.photos/48'}
            alt='User Avatar'
            className='w-12 h-12 rounded-xl object-cover ring-2 ring-gray-100'
          />
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-semibold text-gray-900 break-words whitespace-normal'>{profile?.full_name}</p>
            <p className='text-xs text-gray-500 truncate'>{profile?.email}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className='flex-1 p-4 space-y-1'>
        {accountItems.map((item) => {
          const Icon = item.icon
          const hasChildren = item.children.length > 0
          const parentActive = parentActiveMap[item.path]
          const isOpen = hasChildren && (openState[item.path] ?? parentActive)

          return (
            <div key={item.path}>
              {hasChildren ? (
                <button
                  type='button'
                  aria-expanded={isOpen}
                  onClick={() => {
                    setOpenState((prev) => ({ ...prev, [item.path]: !isOpen }))
                  }}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl
                              transition-all duration-200 group
                              ${parentActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <div className='flex items-center gap-3'>
                    <Icon className='w-5 h-5' />
                    <span className='text-sm font-medium'>{item.label}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between w-full px-4 py-3 rounded-xl
                     transition-all duration-200 group
                     ${isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}`
                  }
                >
                  <div className='flex items-center gap-3'>
                    <Icon className='w-5 h-5' />
                    <span className='text-sm font-medium'>{item.label}</span>
                  </div>
                </NavLink>
              )}

              {/* Children */}
              {isOpen && hasChildren && (
                <div className='mt-1 ml-4 space-y-1'>
                  {item.children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all duration-200
                         ${
                           isActive
                             ? 'text-gray-900 font-medium bg-gray-100'
                             : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                         }`
                      }
                    >
                      <ChevronRight className='w-3.5 h-3.5' />
                      <span>{child.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className='p-4 border-t border-gray-200'>
        <button
          onClick={handleLogout}
          className='w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 flex items-center'
        >
          <LogOutIcon size={18} />
          <span className='ml-2'>Đăng xuất</span>
        </button>
      </div>
    </div>
  )
}
