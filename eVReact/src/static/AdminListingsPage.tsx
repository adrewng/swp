import { useState } from 'react'
import {
  FaCertificate,
  FaChartBar,
  FaCheck,
  FaExchangeAlt,
  FaHeart,
  FaList,
  FaTachometerAlt,
  FaTimes,
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
      <a href='#' className='text-zinc-600 hover:text-zinc-900'>
        Users
      </a>
      <a href='#' className='font-medium text-zinc-900'>
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

const AdminListingsPage = () => {
  const [activeMenu, setActiveMenu] = useState('listings')
  const [filterStatus, setFilterStatus] = useState('all')

  const listings = [
    {
      id: 1,
      thumbnail:
        'https://images.unsplash.com/photo-1620246473111-e1e79601362e?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=100&h=80&fit=crop&ixlib=rb-4.0.3',
      title: 'Porsche 718 Cayman S',
      seller: 'Nguyễn Văn A',
      price: '$68,000',
      status: 'pending',
      createdDate: '15/12/2024',
      verified: false
    },
    {
      id: 2,
      thumbnail:
        'https://images.unsplash.com/photo-1605330310235-97e3c9a17441?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=100&h=80&fit=crop&ixlib=rb-4.0.3',
      title: 'Mini Cooper 5-DOOR',
      seller: 'Trần Thị B',
      price: '$45,000',
      status: 'approved',
      createdDate: '14/12/2024',
      verified: true
    },
    {
      id: 3,
      thumbnail:
        'https://images.unsplash.com/photo-1607599026771-337d10c0e527?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=100&h=80&fit=crop&ixlib=rb-4.0.3',
      title: 'Toyota GR Supra',
      seller: 'Lê Văn C',
      price: '$55,000',
      status: 'approved',
      createdDate: '13/12/2024',
      verified: false
    },
    {
      id: 4,
      thumbnail:
        'https://images.unsplash.com/photo-1596489397666-e8224749622d?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=100&h=80&fit=crop&ixlib=rb-4.0.3',
      title: 'Porsche 911 Turbo',
      seller: 'Phạm Thị D',
      price: '$125,000',
      status: 'rejected',
      createdDate: '12/12/2024',
      verified: false
    },
    {
      id: 5,
      thumbnail:
        'https://images.unsplash.com/photo-1626241285072-520e03e5c7a2?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=100&h=80&fit=crop&ixlib=rb-4.0.3',
      title: 'Porsche Taycan 4S',
      seller: 'Hoàng Văn E',
      price: '$95,000',
      status: 'pending',
      createdDate: '11/12/2024',
      verified: false
    }
  ]

  const filteredListings = listings.filter((listing) => {
    return filterStatus === 'all' || listing.status === filterStatus
  })

  const handleApprove = (listingId: number) => {
    alert(`Phê duyệt tin đăng ID: ${listingId}`)
  }

  const handleReject = (listingId: number) => {
    alert(`Từ chối tin đăng ID: ${listingId}`)
  }

  const handleVerify = (listingId: number) => {
    alert(`Gắn nhãn "Đã kiểm định" cho tin đăng ID: ${listingId}`)
  }

  const handleDelete = (listingId: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa tin đăng này?')) {
      alert(`Xóa tin đăng ID: ${listingId}`)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'>Đã duyệt</span>
      case 'pending':
        return (
          <span className='bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium'>Chờ duyệt</span>
        )
      case 'rejected':
        return <span className='bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium'>Từ chối</span>
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
            <h1 className='text-3xl font-bold text-zinc-900 mb-2'>Quản lý tin đăng</h1>
            <p className='text-zinc-600'>Phê duyệt và quản lý tin đăng bán sản phẩm</p>
          </div>

          {/* Status Filter */}
          <div className='mb-6 flex flex-wrap gap-4'>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className='px-4 py-3 rounded-xl border border-zinc-300 bg-white text-sm outline-none focus:ring-2 focus:ring-zinc-900'
            >
              <option value='all'>Tất cả trạng thái</option>
              <option value='pending'>Chờ duyệt</option>
              <option value='approved'>Đã duyệt</option>
              <option value='rejected'>Từ chối</option>
            </select>

            <div className='flex gap-2'>
              <div className='bg-white rounded-xl border border-zinc-200 px-4 py-3 text-sm'>
                <span className='text-zinc-600'>Tổng: </span>
                <span className='font-medium'>{filteredListings.length}</span>
              </div>
              <div className='bg-yellow-50 rounded-xl border border-yellow-200 px-4 py-3 text-sm'>
                <span className='text-yellow-700'>Chờ duyệt: </span>
                <span className='font-medium'>{listings.filter((l) => l.status === 'pending').length}</span>
              </div>
            </div>
          </div>

          {/* Listings Table */}
          <div className='rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden'>
            <div className='px-6 py-4 border-b border-zinc-200'>
              <h2 className='text-lg font-semibold'>Danh sách tin đăng ({filteredListings.length})</h2>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-zinc-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Sản phẩm
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Người đăng
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Giá
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Trạng thái
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Ngày tạo
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-zinc-200'>
                  {filteredListings.map((listing) => (
                    <tr key={listing.id} className='hover:bg-zinc-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center gap-3'>
                          <div className='w-16 h-12 rounded-xl overflow-hidden bg-zinc-100'>
                            <img src={listing.thumbnail} alt={listing.title} className='size-full object-cover' />
                          </div>
                          <div>
                            <div className='font-medium text-zinc-900 flex items-center gap-2'>
                              {listing.title}
                              {listing.verified && (
                                <FaCertificate className='text-blue-500 text-sm' title='Đã kiểm định' />
                              )}
                            </div>
                            <div className='text-sm text-zinc-600'>ID: {listing.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-zinc-700'>{listing.seller}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-zinc-900'>
                        {listing.price}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>{getStatusBadge(listing.status)}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-zinc-700'>{listing.createdDate}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center gap-2 flex-wrap'>
                          {listing.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApprove(listing.id)}
                                className='inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-xl text-xs font-medium hover:bg-green-200 transition-colors'
                              >
                                <FaCheck />
                                Duyệt
                              </button>
                              <button
                                onClick={() => handleReject(listing.id)}
                                className='inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-xl text-xs font-medium hover:bg-red-200 transition-colors'
                              >
                                <FaTimes />
                                Từ chối
                              </button>
                            </>
                          )}
                          {listing.status === 'approved' && !listing.verified && (
                            <button
                              onClick={() => handleVerify(listing.id)}
                              className='inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-xl text-xs font-medium hover:bg-blue-200 transition-colors'
                            >
                              <FaCertificate />
                              Kiểm định
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(listing.id)}
                            className='inline-flex items-center gap-1 bg-zinc-100 text-zinc-800 px-3 py-1 rounded-xl text-xs font-medium hover:bg-zinc-200 transition-colors'
                          >
                            <FaTimes />
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredListings.length === 0 && (
              <div className='text-center py-12'>
                <div className='text-zinc-500 mb-2'>Không tìm thấy tin đăng nào</div>
                <div className='text-sm text-zinc-400'>Thử thay đổi bộ lọc trạng thái</div>
              </div>
            )}
          </div>

          {/* Summary Stats */}
          <div className='mt-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div className='bg-white rounded-xl border border-zinc-200 p-4 text-center'>
              <div className='text-2xl font-bold text-zinc-900'>{listings.length}</div>
              <div className='text-sm text-zinc-600'>Tổng tin đăng</div>
            </div>
            <div className='bg-white rounded-xl border border-zinc-200 p-4 text-center'>
              <div className='text-2xl font-bold text-green-600'>
                {listings.filter((l) => l.status === 'approved').length}
              </div>
              <div className='text-sm text-zinc-600'>Đã duyệt</div>
            </div>
            <div className='bg-white rounded-xl border border-zinc-200 p-4 text-center'>
              <div className='text-2xl font-bold text-yellow-600'>
                {listings.filter((l) => l.status === 'pending').length}
              </div>
              <div className='text-sm text-zinc-600'>Chờ duyệt</div>
            </div>
            <div className='bg-white rounded-xl border border-zinc-200 p-4 text-center'>
              <div className='text-2xl font-bold text-blue-600'>{listings.filter((l) => l.verified).length}</div>
              <div className='text-sm text-zinc-600'>Đã kiểm định</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminListingsPage
