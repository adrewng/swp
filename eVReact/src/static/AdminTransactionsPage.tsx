import { useState } from 'react'
import {
  FaChartBar,
  FaExchangeAlt,
  FaExclamationTriangle,
  FaEye,
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
      <a href='#' className='text-zinc-600 hover:text-zinc-900'>
        Dashboard
      </a>
      <a href='#' className='text-zinc-600 hover:text-zinc-900'>
        Users
      </a>
      <a href='#' className='text-zinc-600 hover:text-zinc-900'>
        Listings
      </a>
      <a href='#' className='font-medium text-zinc-900'>
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

const AdminTransactionsPage = () => {
  const [activeMenu, setActiveMenu] = useState('transactions')
  const [filterStatus, setFilterStatus] = useState('all')

  const transactions = [
    {
      id: 'TX001',
      buyer: 'Nguyễn Văn A',
      seller: 'Trần Thị B',
      product: 'Porsche 718 Cayman S',
      amount: '$68,000',
      status: 'completed',
      date: '15/12/2024',
      hasDispute: false
    },
    {
      id: 'TX002',
      buyer: 'Lê Văn C',
      seller: 'Phạm Thị D',
      product: 'Mini Cooper 5-DOOR',
      amount: '$45,000',
      status: 'processing',
      date: '14/12/2024',
      hasDispute: false
    },
    {
      id: 'TX003',
      buyer: 'Hoàng Văn E',
      seller: 'Vũ Thị F',
      product: 'Toyota GR Supra',
      amount: '$55,000',
      status: 'disputed',
      date: '13/12/2024',
      hasDispute: true
    },
    {
      id: 'TX004',
      buyer: 'Đỗ Văn G',
      seller: 'Nguyễn Thị H',
      product: 'Porsche 911 Turbo',
      amount: '$125,000',
      status: 'cancelled',
      date: '12/12/2024',
      hasDispute: false
    },
    {
      id: 'TX005',
      buyer: 'Trịnh Văn I',
      seller: 'Lý Thị K',
      product: 'BMW M4',
      amount: '$85,000',
      status: 'completed',
      date: '11/12/2024',
      hasDispute: false
    }
  ]

  const filteredTransactions = transactions.filter((transaction) => {
    return filterStatus === 'all' || transaction.status === filterStatus
  })

  const handleViewDetails = (transactionId: string) => {
    alert(`Xem chi tiết giao dịch: ${transactionId}`)
  }

  const handleResolveDispute = (transactionId: string) => {
    alert(`Xử lý khiếu nại cho giao dịch: ${transactionId}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'>Hoàn thành</span>
        )
      case 'processing':
        return <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium'>Đang xử lý</span>
      case 'disputed':
        return <span className='bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium'>Tranh chấp</span>
      case 'cancelled':
        return <span className='bg-zinc-100 text-zinc-800 px-2 py-1 rounded-full text-xs font-medium'>Đã hủy</span>
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
            <h1 className='text-3xl font-bold text-zinc-900 mb-2'>Quản lý giao dịch</h1>
            <p className='text-zinc-600'>Theo dõi và xử lý các giao dịch trong hệ thống</p>
          </div>

          {/* Status Filter and Stats */}
          <div className='mb-6 flex flex-col lg:flex-row gap-4 justify-between'>
            <div className='flex flex-wrap gap-4'>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className='px-4 py-3 rounded-xl border border-zinc-300 bg-white text-sm outline-none focus:ring-2 focus:ring-zinc-900'
              >
                <option value='all'>Tất cả trạng thái</option>
                <option value='completed'>Hoàn thành</option>
                <option value='processing'>Đang xử lý</option>
                <option value='disputed'>Tranh chấp</option>
                <option value='cancelled'>Đã hủy</option>
              </select>
            </div>

            <div className='flex gap-2'>
              <div className='bg-white rounded-xl border border-zinc-200 px-4 py-3 text-sm'>
                <span className='text-zinc-600'>Tổng: </span>
                <span className='font-medium'>{filteredTransactions.length}</span>
              </div>
              <div className='bg-red-50 rounded-xl border border-red-200 px-4 py-3 text-sm'>
                <span className='text-red-700'>Tranh chấp: </span>
                <span className='font-medium'>{transactions.filter((t) => t.status === 'disputed').length}</span>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className='rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden'>
            <div className='px-6 py-4 border-b border-zinc-200'>
              <h2 className='text-lg font-semibold'>Danh sách giao dịch ({filteredTransactions.length})</h2>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-zinc-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Mã giao dịch
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Người mua
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Người bán
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Sản phẩm
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Số tiền
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Trạng thái
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Ngày
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-zinc-200'>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className='hover:bg-zinc-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center gap-2'>
                          <span className='font-medium text-zinc-900'>{transaction.id}</span>
                          {transaction.hasDispute && (
                            <FaExclamationTriangle className='text-red-500 text-sm' title='Có tranh chấp' />
                          )}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center gap-3'>
                          <div className='size-8 rounded-full bg-zinc-200 flex items-center justify-center text-sm font-medium text-zinc-700'>
                            {transaction.buyer.charAt(0)}
                          </div>
                          <span className='text-sm text-zinc-700'>{transaction.buyer}</span>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center gap-3'>
                          <div className='size-8 rounded-full bg-zinc-200 flex items-center justify-center text-sm font-medium text-zinc-700'>
                            {transaction.seller.charAt(0)}
                          </div>
                          <span className='text-sm text-zinc-700'>{transaction.seller}</span>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-zinc-700'>{transaction.product}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-zinc-900'>
                        {transaction.amount}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>{getStatusBadge(transaction.status)}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-zinc-700'>{transaction.date}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center gap-2'>
                          <button
                            onClick={() => handleViewDetails(transaction.id)}
                            className='inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-xl text-xs font-medium hover:bg-blue-200 transition-colors'
                          >
                            <FaEye />
                            Chi tiết
                          </button>
                          {transaction.hasDispute && (
                            <button
                              onClick={() => handleResolveDispute(transaction.id)}
                              className='inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-xl text-xs font-medium hover:bg-orange-200 transition-colors'
                            >
                              <FaExclamationTriangle />
                              Xử lý khiếu nại
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredTransactions.length === 0 && (
              <div className='text-center py-12'>
                <div className='text-zinc-500 mb-2'>Không tìm thấy giao dịch nào</div>
                <div className='text-sm text-zinc-400'>Thử thay đổi bộ lọc trạng thái</div>
              </div>
            )}
          </div>

          {/* Summary Stats */}
          <div className='mt-6 grid grid-cols-1 md:grid-cols-5 gap-4'>
            <div className='bg-white rounded-xl border border-zinc-200 p-4 text-center'>
              <div className='text-2xl font-bold text-zinc-900'>{transactions.length}</div>
              <div className='text-sm text-zinc-600'>Tổng giao dịch</div>
            </div>
            <div className='bg-white rounded-xl border border-zinc-200 p-4 text-center'>
              <div className='text-2xl font-bold text-green-600'>
                {transactions.filter((t) => t.status === 'completed').length}
              </div>
              <div className='text-sm text-zinc-600'>Hoàn thành</div>
            </div>
            <div className='bg-white rounded-xl border border-zinc-200 p-4 text-center'>
              <div className='text-2xl font-bold text-blue-600'>
                {transactions.filter((t) => t.status === 'processing').length}
              </div>
              <div className='text-sm text-zinc-600'>Đang xử lý</div>
            </div>
            <div className='bg-white rounded-xl border border-zinc-200 p-4 text-center'>
              <div className='text-2xl font-bold text-red-600'>
                {transactions.filter((t) => t.status === 'disputed').length}
              </div>
              <div className='text-sm text-zinc-600'>Tranh chấp</div>
            </div>
            <div className='bg-white rounded-xl border border-zinc-200 p-4 text-center'>
              <div className='text-2xl font-bold text-zinc-600'>
                {transactions.filter((t) => t.status === 'cancelled').length}
              </div>
              <div className='text-sm text-zinc-600'>Đã hủy</div>
            </div>
          </div>

          {/* Recent Disputes */}
          <div className='mt-6 rounded-2xl border border-zinc-200 bg-white shadow-sm'>
            <div className='px-6 py-4 border-b border-zinc-200'>
              <h2 className='text-lg font-semibold text-red-600'>Khiếu nại cần xử lý</h2>
            </div>
            <div className='p-6'>
              {transactions.filter((t) => t.hasDispute).length > 0 ? (
                <div className='space-y-4'>
                  {transactions
                    .filter((t) => t.hasDispute)
                    .map((transaction) => (
                      <div
                        key={transaction.id}
                        className='flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200'
                      >
                        <div>
                          <div className='font-medium text-red-900'>Giao dịch {transaction.id}</div>
                          <div className='text-sm text-red-700'>
                            {transaction.buyer} ↔ {transaction.seller} • {transaction.product}
                          </div>
                        </div>
                        <button
                          onClick={() => handleResolveDispute(transaction.id)}
                          className='bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-700 transition-colors'
                        >
                          Xử lý ngay
                        </button>
                      </div>
                    ))}
                </div>
              ) : (
                <div className='text-center text-zinc-500 py-8'>Không có khiếu nại nào cần xử lý</div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminTransactionsPage
