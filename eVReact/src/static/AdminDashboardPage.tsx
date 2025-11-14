import { useState } from 'react'
import {
  FaCar,
  FaChartBar,
  FaDollarSign,
  FaExchangeAlt,
  FaHeart,
  FaList,
  FaTachometerAlt,
  FaUsers
} from 'react-icons/fa'

// Header component reused from ProductList.tsx
const Header = () => (
  <header className='sticky top-0 z-20 flex items-center justify-between bg-white/80 backdrop-blur border-b border-zinc-200 px-4 md:px-8 h-16'>
    <div className='font-black tracking-wide text-lg'>OPTIMUM ADMIN</div>
    <nav className='hidden md:flex gap-6 text-sm'>
      <a href='#' className='font-medium text-zinc-900'>
        Dashboard
      </a>
      <a href='#' className='text-zinc-600 hover:text-zinc-900'>
        Users
      </a>
      <a href='#' className='text-zinc-600 hover:text-zinc-900'>
        Listings
      </a>
      <a href='#' className='text-zinc-600 hover:text-zinc-900'>
        Transactions
      </a>
    </nav>
    <div className='flex items-center gap-4'>
      <FaHeart className='text-zinc-700' />
      <div className='size-8 rounded-full overflow-hidden ring-1 ring-zinc-200'>
        <img src='https://picsum.photos/32' alt='Admin' className='size-full object-cover' />
      </div>
    </div>
  </header>
)

const Sidebar = ({ activeMenu, setActiveMenu }: { activeMenu: string; setActiveMenu: (menu: string) => void }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    { id: 'users', label: 'Users', icon: FaUsers },
    { id: 'listings', label: 'Listings', icon: FaList },
    { id: 'transactions', label: 'Transactions', icon: FaExchangeAlt },
    { id: 'reports', label: 'Reports', icon: FaChartBar }
  ]

  return (
    <aside className='w-64 bg-white border-r border-zinc-200 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto'>
      <div className='p-6'>
        <h2 className='text-lg font-semibold text-zinc-900 mb-6'>Quản trị</h2>
        <nav className='space-y-2'>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                activeMenu === item.id ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              <item.icon />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  change,
  changeType
}: {
  title: string
  value: string
  icon: React.ComponentType<any>
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
}) => (
  <div className='rounded-3xl border border-white/20 bg-white/90 backdrop-blur-xl p-6 shadow-2xl shadow-black/5 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden group'>
    {/* Gradient background based on change type */}
    <div
      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        changeType === 'positive'
          ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/5'
          : changeType === 'negative'
            ? 'bg-gradient-to-br from-red-500/10 to-orange-500/5'
            : 'bg-gradient-to-br from-blue-500/10 to-purple-500/5'
      }`}
    ></div>

    <div className='relative z-10'>
      <div className='flex items-center justify-between mb-4'>
        <div
          className={`p-4 rounded-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300 ${
            changeType === 'positive'
              ? 'bg-gradient-to-br from-green-500 to-emerald-600'
              : changeType === 'negative'
                ? 'bg-gradient-to-br from-red-500 to-orange-600'
                : 'bg-gradient-to-br from-blue-500 to-purple-600'
          }`}
        >
          <Icon className='text-white text-2xl' />
        </div>
        <span
          className={`text-sm font-bold px-3 py-1 rounded-full ${
            changeType === 'positive'
              ? 'text-green-700 bg-green-100'
              : changeType === 'negative'
                ? 'text-red-700 bg-red-100'
                : 'text-blue-700 bg-blue-100'
          }`}
        >
          {change}
        </span>
      </div>
      <div>
        <div className='text-3xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent mb-2'>
          {value}
        </div>
        <div className='text-sm text-zinc-600 font-medium'>{title}</div>
      </div>
    </div>

    {/* Decorative corner element */}
    <div className='absolute top-2 right-2 w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 animate-pulse'></div>
  </div>
)

const AdminDashboardPage = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard')

  const stats = [
    {
      title: 'Tổng người dùng',
      value: '12,543',
      icon: FaUsers,
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      title: 'Tin đăng hoạt động',
      value: '3,247',
      icon: FaCar,
      change: '+8%',
      changeType: 'positive' as const
    },
    {
      title: 'Doanh thu tháng này',
      value: '$2.4M',
      icon: FaDollarSign,
      change: '+23%',
      changeType: 'positive' as const
    },
    {
      title: 'Giao dịch hoàn thành',
      value: '1,892',
      icon: FaExchangeAlt,
      change: '+15%',
      changeType: 'positive' as const
    }
  ]

  const recentActivity = [
    { action: 'Người dùng mới đăng ký', user: 'Nguyễn Văn A', time: '5 phút trước' },
    { action: 'Tin đăng mới được tạo', user: 'Trần Thị B', time: '10 phút trước' },
    { action: 'Giao dịch hoàn thành', user: 'Lê Văn C', time: '15 phút trước' },
    { action: 'Báo cáo vi phạm', user: 'Phạm Thị D', time: '20 phút trước' },
    { action: 'Thanh toán thành công', user: 'Hoàng Văn E', time: '25 phút trước' }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-50 via-slate-50 to-indigo-50 text-zinc-900 relative overflow-hidden'>
      {/* Background decorations */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-tr from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
      </div>

      <Header />

      <div className='flex relative z-10'>
        <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

        <main className='flex-1 p-8'>
          <div className='mb-10'>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-zinc-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-3'>
              Admin Dashboard
            </h1>
            <p className='text-zinc-600 text-lg'>Tổng quan về hoạt động của hệ thống</p>
            <div className='w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2'></div>
          </div>

          {/* Stats Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Recent Activity */}
            <div className='rounded-3xl border border-white/20 bg-white/90 backdrop-blur-xl shadow-2xl shadow-black/5 hover:shadow-3xl transition-all duration-500 relative overflow-hidden group'>
              <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

              <div className='px-6 py-4 border-b border-zinc-200/50 relative z-10'>
                <h2 className='text-xl font-bold bg-gradient-to-r from-zinc-900 to-blue-800 bg-clip-text text-transparent'>
                  Hoạt động gần đây
                </h2>
              </div>
              <div className='p-6 relative z-10'>
                <div className='space-y-4'>
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between py-4 px-4 border border-zinc-100 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-105 hover:shadow-md group'
                    >
                      <div className='flex items-center gap-3'>
                        <div className='w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse'></div>
                        <div>
                          <div className='font-semibold text-zinc-900 group-hover:text-blue-700 transition-colors'>
                            {activity.action}
                          </div>
                          <div className='text-sm text-zinc-600'>{activity.user}</div>
                        </div>
                      </div>
                      <div className='text-sm text-zinc-500 bg-zinc-100 px-2 py-1 rounded-full'>{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className='rounded-3xl border border-white/20 bg-white/90 backdrop-blur-xl shadow-2xl shadow-black/5 hover:shadow-3xl transition-all duration-500 relative overflow-hidden group'>
              <div className='absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

              <div className='px-6 py-4 border-b border-zinc-200/50 relative z-10'>
                <h2 className='text-xl font-bold bg-gradient-to-r from-zinc-900 to-green-800 bg-clip-text text-transparent'>
                  Thao tác nhanh
                </h2>
              </div>
              <div className='p-6 relative z-10'>
                <div className='grid grid-cols-1 gap-4'>
                  <button className='flex items-center gap-4 p-5 border border-white/50 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 text-left transform hover:scale-105 hover:shadow-lg group'>
                    <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300'>
                      <FaUsers className='text-white text-xl' />
                    </div>
                    <div>
                      <div className='font-semibold text-lg group-hover:text-blue-700 transition-colors'>
                        Quản lý người dùng
                      </div>
                      <div className='text-sm text-zinc-600'>Xem và quản lý tài khoản người dùng</div>
                    </div>
                  </button>

                  <button className='flex items-center gap-4 p-5 border border-white/50 rounded-2xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 text-left transform hover:scale-105 hover:shadow-lg group'>
                    <div className='w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300'>
                      <FaCar className='text-white text-xl' />
                    </div>
                    <div>
                      <div className='font-semibold text-lg group-hover:text-green-700 transition-colors'>
                        Duyệt tin đăng
                      </div>
                      <div className='text-sm text-zinc-600'>Phê duyệt tin đăng mới</div>
                    </div>
                  </button>

                  <button className='flex items-center gap-4 p-5 border border-white/50 rounded-2xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 text-left transform hover:scale-105 hover:shadow-lg group'>
                    <div className='w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300'>
                      <FaExchangeAlt className='text-white text-xl' />
                    </div>
                    <div>
                      <div className='font-semibold text-lg group-hover:text-orange-700 transition-colors'>
                        Xử lý giao dịch
                      </div>
                      <div className='text-sm text-zinc-600'>Giải quyết khiếu nại và tranh chấp</div>
                    </div>
                  </button>

                  <button className='flex items-center gap-4 p-5 border border-white/50 rounded-2xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 text-left transform hover:scale-105 hover:shadow-lg group'>
                    <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300'>
                      <FaChartBar className='text-white text-xl' />
                    </div>
                    <div>
                      <div className='font-semibold text-lg group-hover:text-purple-700 transition-colors'>
                        Xem báo cáo
                      </div>
                      <div className='text-sm text-zinc-600'>Thống kê và phân tích dữ liệu</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className='mt-8 rounded-3xl border border-white/20 bg-white/90 backdrop-blur-xl shadow-2xl shadow-black/5 hover:shadow-3xl transition-all duration-500 relative overflow-hidden group'>
            <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

            <div className='px-6 py-4 border-b border-zinc-200/50 relative z-10'>
              <h2 className='text-xl font-bold bg-gradient-to-r from-zinc-900 to-cyan-800 bg-clip-text text-transparent'>
                Trạng thái hệ thống
              </h2>
            </div>
            <div className='p-8 relative z-10'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div className='text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 hover:shadow-lg transition-all duration-300 transform hover:scale-105'>
                  <div className='w-6 h-6 bg-green-500 rounded-full mx-auto mb-3 animate-pulse shadow-lg'></div>
                  <div className='font-bold text-lg text-green-700'>Server Status</div>
                  <div className='text-sm text-green-600 font-medium'>Hoạt động bình thường</div>
                  <div className='text-xs text-green-500 mt-1'>99.9% uptime</div>
                </div>
                <div className='text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 hover:shadow-lg transition-all duration-300 transform hover:scale-105'>
                  <div className='w-6 h-6 bg-green-500 rounded-full mx-auto mb-3 animate-pulse shadow-lg delay-200'></div>
                  <div className='font-bold text-lg text-green-700'>Database</div>
                  <div className='text-sm text-green-600 font-medium'>Kết nối ổn định</div>
                  <div className='text-xs text-green-500 mt-1'>Response: 12ms</div>
                </div>
                <div className='text-center p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200/50 hover:shadow-lg transition-all duration-300 transform hover:scale-105'>
                  <div className='w-6 h-6 bg-yellow-500 rounded-full mx-auto mb-3 animate-pulse shadow-lg delay-500'></div>
                  <div className='font-bold text-lg text-yellow-700'>Payment Gateway</div>
                  <div className='text-sm text-yellow-600 font-medium'>Bảo trì định kỳ</div>
                  <div className='text-xs text-yellow-500 mt-1'>Kết thúc: 2h nữa</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboardPage
