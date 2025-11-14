import { useState } from 'react'
import {
  FaBan,
  FaChartBar,
  FaCheck,
  FaExchangeAlt,
  FaHeart,
  FaList,
  FaSearch,
  FaTachometerAlt,
  FaUsers
} from 'react-icons/fa'

// Header component reused from ProductList.tsx
const Header = () => (
  <header className='sticky top-0 z-20 flex items-center justify-between bg-white/80 backdrop-blur border-b border-zinc-200 px-4 md:px-8 h-16'>
    <div className='font-black tracking-wide text-lg'>OPTIMUM ADMIN</div>
    <nav className='hidden md:flex gap-6 text-sm'>
      <a href='#' className='text-zinc-600 hover:text-zinc-900'>
        Dashboard
      </a>
      <a href='#' className='font-medium text-zinc-900'>
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

const AdminUsersPage = () => {
  const [activeMenu, setActiveMenu] = useState('users')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const users = [
    {
      id: 1,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      status: 'active',
      joinDate: '15/12/2024',
      listings: 5,
      transactions: 12
    },
    {
      id: 2,
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      name: 'Trần Thị B',
      email: 'tranthib@example.com',
      status: 'pending',
      joinDate: '14/12/2024',
      listings: 2,
      transactions: 3
    },
    {
      id: 3,
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
      name: 'Lê Văn C',
      email: 'levanc@example.com',
      status: 'active',
      joinDate: '13/12/2024',
      listings: 8,
      transactions: 25
    },
    {
      id: 4,
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      name: 'Phạm Thị D',
      email: 'phamthid@example.com',
      status: 'blocked',
      joinDate: '12/12/2024',
      listings: 1,
      transactions: 0
    },
    {
      id: 5,
      avatar: 'https://randomuser.me/api/portraits/men/77.jpg',
      name: 'Hoàng Văn E',
      email: 'hoangvane@example.com',
      status: 'active',
      joinDate: '11/12/2024',
      listings: 3,
      transactions: 7
    }
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleApprove = (userId: number) => {
    alert(`Phê duyệt người dùng ID: ${userId}`)
  }

  const handleBlock = (userId: number) => {
    alert(`Khóa người dùng ID: ${userId}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'>Hoạt động</span>
      case 'pending':
        return (
          <span className='bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium'>Chờ duyệt</span>
        )
      case 'blocked':
        return <span className='bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium'>Đã khóa</span>
      default:
        return (
          <span className='bg-zinc-100 text-zinc-800 px-2 py-1 rounded-full text-xs font-medium'>Không xác định</span>
        )
    }
  }

  return (
    <div className='min-h-screen bg-zinc-50 text-zinc-900'>
      <Header />

      <div className='flex'>
        <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

        <main className='flex-1 p-6'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-zinc-900 mb-2'>Quản lý người dùng</h1>
            <p className='text-zinc-600'>Quản lý tài khoản và quyền hạn người dùng</p>
          </div>

          {/* Search and Filter */}
          <div className='mb-6 flex flex-col sm:flex-row gap-4'>
            <div className='flex-1 relative'>
              <FaSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400' />
              <input
                type='text'
                placeholder='Tìm kiếm theo tên hoặc email...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-300 bg-white text-sm outline-none focus:ring-2 focus:ring-zinc-900'
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className='px-4 py-3 rounded-xl border border-zinc-300 bg-white text-sm outline-none focus:ring-2 focus:ring-zinc-900'
            >
              <option value='all'>Tất cả trạng thái</option>
              <option value='active'>Hoạt động</option>
              <option value='pending'>Chờ duyệt</option>
              <option value='blocked'>Đã khóa</option>
            </select>
          </div>

          {/* Users Table */}
          <div className='rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden'>
            <div className='px-6 py-4 border-b border-zinc-200'>
              <h2 className='text-lg font-semibold'>Danh sách người dùng ({filteredUsers.length})</h2>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-zinc-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Người dùng
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Email
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Trạng thái
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Ngày tham gia
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Tin đăng
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Giao dịch
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-zinc-200'>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className='hover:bg-zinc-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center gap-3'>
                          <div className='size-10 rounded-full overflow-hidden ring-2 ring-zinc-100'>
                            <img src={user.avatar} alt={user.name} className='size-full object-cover' />
                          </div>
                          <div>
                            <div className='font-medium text-zinc-900'>{user.name}</div>
                            <div className='text-sm text-zinc-600'>ID: {user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-zinc-700'>{user.email}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>{getStatusBadge(user.status)}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-zinc-700'>{user.joinDate}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-zinc-700'>{user.listings}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-zinc-700'>{user.transactions}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center gap-2'>
                          {user.status === 'pending' && (
                            <button
                              onClick={() => handleApprove(user.id)}
                              className='inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-xl text-xs font-medium hover:bg-green-200 transition-colors'
                            >
                              <FaCheck />
                              Duyệt
                            </button>
                          )}
                          {user.status !== 'blocked' && (
                            <button
                              onClick={() => handleBlock(user.id)}
                              className='inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-xl text-xs font-medium hover:bg-red-200 transition-colors'
                            >
                              <FaBan />
                              Khóa
                            </button>
                          )}
                          {user.status === 'blocked' && (
                            <button
                              onClick={() => handleApprove(user.id)}
                              className='inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-xl text-xs font-medium hover:bg-blue-200 transition-colors'
                            >
                              <FaCheck />
                              Mở khóa
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className='text-center py-12'>
                <div className='text-zinc-500 mb-2'>Không tìm thấy người dùng nào</div>
                <div className='text-sm text-zinc-400'>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</div>
              </div>
            )}
          </div>

          {/* Summary Stats */}
          <div className='mt-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div className='bg-white rounded-xl border border-zinc-200 p-4 text-center'>
              <div className='text-2xl font-bold text-zinc-900'>{users.length}</div>
              <div className='text-sm text-zinc-600'>Tổng người dùng</div>
            </div>
            <div className='bg-white rounded-xl border border-zinc-200 p-4 text-center'>
              <div className='text-2xl font-bold text-green-600'>
                {users.filter((u) => u.status === 'active').length}
              </div>
              <div className='text-sm text-zinc-600'>Hoạt động</div>
            </div>
            <div className='bg-white rounded-xl border border-zinc-200 p-4 text-center'>
              <div className='text-2xl font-bold text-yellow-600'>
                {users.filter((u) => u.status === 'pending').length}
              </div>
              <div className='text-sm text-zinc-600'>Chờ duyệt</div>
            </div>
            <div className='bg-white rounded-xl border border-zinc-200 p-4 text-center'>
              <div className='text-2xl font-bold text-red-600'>
                {users.filter((u) => u.status === 'blocked').length}
              </div>
              <div className='text-sm text-zinc-600'>Đã khóa</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminUsersPage
