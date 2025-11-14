import { useState } from 'react'
import {
  FaCalendarAlt,
  FaChartBar,
  FaDownload,
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
      <a href='#' className='text-zinc-600 hover:text-zinc-900'>
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
      <a href='#' className='font-medium text-zinc-900'>
        Reports
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

const ChartPlaceholder = ({ title, type }: { title: string; type: 'line' | 'bar' | 'pie' }) => (
  <div className='h-64 bg-zinc-100 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-zinc-300'>
    <FaChartBar className='text-4xl text-zinc-400 mb-4' />
    <div className='text-lg font-medium text-zinc-600 mb-2'>{title}</div>
    <div className='text-sm text-zinc-500'>Biểu đồ {type} sẽ hiển thị tại đây</div>
  </div>
)

const AdminReportsPage = () => {
  const [activeMenu, setActiveMenu] = useState('reports')
  const [dateFrom, setDateFrom] = useState('2024-12-01')
  const [dateTo, setDateTo] = useState('2024-12-15')

  const revenueData = [
    { month: 'Tháng 1', revenue: 120000, commission: 6000 },
    { month: 'Tháng 2', revenue: 135000, commission: 6750 },
    { month: 'Tháng 3', revenue: 148000, commission: 7400 },
    { month: 'Tháng 4', revenue: 162000, commission: 8100 },
    { month: 'Tháng 5', revenue: 178000, commission: 8900 },
    { month: 'Tháng 6', revenue: 195000, commission: 9750 },
    { month: 'Tháng 7', revenue: 210000, commission: 10500 },
    { month: 'Tháng 8', revenue: 225000, commission: 11250 },
    { month: 'Tháng 9', revenue: 240000, commission: 12000 },
    { month: 'Tháng 10', revenue: 258000, commission: 12900 },
    { month: 'Tháng 11', revenue: 275000, commission: 13750 },
    { month: 'Tháng 12', revenue: 290000, commission: 14500 }
  ]

  const topProducts = [
    { name: 'Porsche 718 Cayman S', sales: 25, revenue: '$1,700,000' },
    { name: 'BMW M4', sales: 22, revenue: '$1,540,000' },
    { name: 'Toyota GR Supra', sales: 20, revenue: '$1,100,000' },
    { name: 'Mini Cooper Works', sales: 18, revenue: '$810,000' },
    { name: 'Porsche 911 Turbo', sales: 15, revenue: '$1,875,000' }
  ]

  const handleExportReport = () => {
    alert('Xuất báo cáo thành công!')
  }

  return (
    <div className='min-h-screen bg-zinc-50 text-zinc-900'>
      <Header />

      <div className='flex'>
        <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

        <main className='flex-1 p-6'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-zinc-900 mb-2'>Báo cáo & Thống kê</h1>
            <p className='text-zinc-600'>Phân tích dữ liệu và xu hướng kinh doanh</p>
          </div>

          {/* Date Filter Section */}
          <div className='mb-8 rounded-2xl border border-zinc-200 bg-white shadow-sm p-6'>
            <div className='flex flex-col md:flex-row gap-4 items-start md:items-end justify-between'>
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='space-y-1'>
                  <label className='text-sm font-medium text-zinc-700 flex items-center gap-2'>
                    <FaCalendarAlt />
                    Từ ngày
                  </label>
                  <input
                    type='date'
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className='rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900'
                  />
                </div>
                <div className='space-y-1'>
                  <label className='text-sm font-medium text-zinc-700 flex items-center gap-2'>
                    <FaCalendarAlt />
                    Đến ngày
                  </label>
                  <input
                    type='date'
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className='rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900'
                  />
                </div>
                <button className='bg-zinc-900 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors self-end'>
                  Áp dụng
                </button>
              </div>
              <button
                onClick={handleExportReport}
                className='flex items-center gap-2 border border-zinc-300 text-zinc-700 px-4 py-3 rounded-xl text-sm font-medium hover:bg-zinc-50 transition-colors'
              >
                <FaDownload />
                Xuất báo cáo
              </button>
            </div>
          </div>

          {/* Charts Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
            {/* Revenue Chart */}
            <div className='rounded-2xl border border-zinc-200 bg-white shadow-sm p-6'>
              <h2 className='text-lg font-semibold mb-4'>Doanh thu theo thời gian</h2>
              <ChartPlaceholder title='Biểu đồ doanh thu' type='line' />
            </div>

            {/* User Growth Chart */}
            <div className='rounded-2xl border border-zinc-200 bg-white shadow-sm p-6'>
              <h2 className='text-lg font-semibold mb-4'>Tăng trưởng người dùng</h2>
              <ChartPlaceholder title='Biểu đồ tăng trưởng' type='bar' />
            </div>

            {/* Category Distribution */}
            <div className='rounded-2xl border border-zinc-200 bg-white shadow-sm p-6'>
              <h2 className='text-lg font-semibold mb-4'>Phân bố theo danh mục</h2>
              <ChartPlaceholder title='Biểu đồ phân bố' type='pie' />
            </div>

            {/* Transaction Trends */}
            <div className='rounded-2xl border border-zinc-200 bg-white shadow-sm p-6'>
              <h2 className='text-lg font-semibold mb-4'>Xu hướng giao dịch</h2>
              <ChartPlaceholder title='Biểu đồ xu hướng' type='line' />
            </div>
          </div>

          {/* Data Tables */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* Revenue & Commission Table */}
            <div className='rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden'>
              <div className='px-6 py-4 border-b border-zinc-200'>
                <h2 className='text-lg font-semibold'>Doanh thu & Hoa hồng</h2>
              </div>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-zinc-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                        Thời gian
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                        Doanh thu
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                        Hoa hồng (5%)
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-zinc-200'>
                    {revenueData.slice(-6).map((data, index) => (
                      <tr key={index} className='hover:bg-zinc-50'>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900'>{data.month}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-zinc-700'>
                          ${data.revenue.toLocaleString()}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600'>
                          ${data.commission.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Products Table */}
            <div className='rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden'>
              <div className='px-6 py-4 border-b border-zinc-200'>
                <h2 className='text-lg font-semibold'>Sản phẩm bán chạy</h2>
              </div>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-zinc-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                        Sản phẩm
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                        Lượt bán
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                        Doanh thu
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-zinc-200'>
                    {topProducts.map((product, index) => (
                      <tr key={index} className='hover:bg-zinc-50'>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center gap-3'>
                            <div className='size-8 bg-zinc-200 rounded-xl flex items-center justify-center text-sm font-medium text-zinc-700'>
                              #{index + 1}
                            </div>
                            <span className='text-sm font-medium text-zinc-900'>{product.name}</span>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-zinc-700'>{product.sales}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-zinc-900'>
                          {product.revenue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className='mt-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div className='bg-white rounded-xl border border-zinc-200 p-6 text-center'>
              <div className='text-3xl font-bold text-blue-600 mb-2'>$2.4M</div>
              <div className='text-sm text-zinc-600'>Tổng doanh thu</div>
              <div className='text-xs text-green-600 mt-1'>+15% so với tháng trước</div>
            </div>
            <div className='bg-white rounded-xl border border-zinc-200 p-6 text-center'>
              <div className='text-3xl font-bold text-green-600 mb-2'>$120K</div>
              <div className='text-sm text-zinc-600'>Hoa hồng thu được</div>
              <div className='text-xs text-green-600 mt-1'>+12% so với tháng trước</div>
            </div>
            <div className='bg-white rounded-xl border border-zinc-200 p-6 text-center'>
              <div className='text-3xl font-bold text-purple-600 mb-2'>1,892</div>
              <div className='text-sm text-zinc-600'>Giao dịch thành công</div>
              <div className='text-xs text-green-600 mt-1'>+8% so với tháng trước</div>
            </div>
            <div className='bg-white rounded-xl border border-zinc-200 p-6 text-center'>
              <div className='text-3xl font-bold text-orange-600 mb-2'>$1,275</div>
              <div className='text-sm text-zinc-600'>Giá trị giao dịch TB</div>
              <div className='text-xs text-red-600 mt-1'>-2% so với tháng trước</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminReportsPage
