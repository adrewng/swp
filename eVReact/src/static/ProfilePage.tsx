import { FaCog, FaEdit, FaHeart, FaUsers } from 'react-icons/fa'

// Header component reused from ProductList.tsx
const Header = () => (
  <header className='sticky top-0 z-20 flex items-center justify-between bg-white/80 backdrop-blur border-b border-zinc-200 px-4 md:px-8 h-16'>
    <div className='font-black tracking-wide text-lg'>OPTIMUM</div>
    <nav className='hidden md:flex gap-6 text-sm'>
      <a href='#' className='font-medium text-zinc-900'>
        Booking
      </a>
      <a href='#' className='text-zinc-600 hover:text-zinc-900'>
        About Us
      </a>
      <a href='#' className='text-zinc-600 hover:text-zinc-900'>
        Support
      </a>
      <a href='#' className='text-zinc-600 hover:text-zinc-900'>
        Terms & Conditions
      </a>
    </nav>
    <div className='flex items-center gap-4'>
      <FaHeart className='text-zinc-700' />
      <div className='size-8 rounded-full overflow-hidden ring-1 ring-zinc-200'>
        <img src='https://picsum.photos/32' alt='User' className='size-full object-cover' />
      </div>
    </div>
  </header>
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductCard = ({ product }: { product: any }) => (
  <div className='group rounded-3xl border border-white/20 overflow-hidden bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 relative'>
    {/* Gradient overlay */}
    <div className='absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/5 group-hover:to-pink-500/10 transition-all duration-500 rounded-3xl'></div>

    <div className='flex items-start justify-between p-4 relative z-10'>
      <div>
        <h3 className='font-semibold text-lg group-hover:text-blue-700 transition-colors duration-300'>
          {product.name}
        </h3>
        <p className='text-sm text-zinc-600'>{product.type}</p>
      </div>
      <FaHeart className='text-zinc-400 hover:text-red-500 transition-colors duration-300 cursor-pointer transform hover:scale-125' />
    </div>

    <div className='aspect-[3/1] w-full overflow-hidden relative'>
      <img
        src={product.image}
        alt={product.name}
        className='size-full object-cover transition-transform duration-700 group-hover:scale-110'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
    </div>

    <div className='p-4 flex items-center justify-between relative z-10'>
      <div className='flex items-center gap-4 text-sm text-zinc-700'>
        <span className='inline-flex items-center gap-1 bg-blue-100/80 px-2 py-1 rounded-full'>
          <FaUsers className='text-blue-600' /> {product.passengers}
        </span>
        <span className='inline-flex items-center gap-1 bg-green-100/80 px-2 py-1 rounded-full'>
          <FaCog className='text-green-600' /> {product.transmission}
        </span>
      </div>
      <div className='font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
        {product.price}
      </div>
    </div>

    {/* Decorative corner elements */}
    <div className='absolute top-2 right-2 w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 animate-pulse'></div>
  </div>
)

const ProfilePage = () => {
  const userProducts = [
    {
      name: 'Porsche 718 Cayman S',
      type: 'Coupe',
      passengers: 2,
      transmission: 'Manual',
      price: '$400/d',
      image:
        'https://images.unsplash.com/photo-1620246473111-e1e79601362e?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=300&fit=crop&ixlib=rb-4.0.3'
    },
    {
      name: 'Mini Cooper 5-DOOR',
      type: 'Hatchback',
      passengers: 4,
      transmission: 'Matic',
      price: '$364/d',
      image:
        'https://images.unsplash.com/photo-1605330310235-97e3c9a17441?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=300&fit=crop&ixlib=rb-4.0.3'
    },
    {
      name: 'Toyota GR Supra',
      type: 'Coupe',
      passengers: 2,
      transmission: 'Manual',
      price: '$360/d',
      image:
        'https://images.unsplash.com/photo-1607599026771-337d10c0e527?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=300&fit=crop&ixlib=rb-4.0.3'
    }
  ]

  const transactionHistory = [
    {
      id: 'TX001',
      product: 'Porsche 911 Turbo',
      buyer: 'Nguyễn Văn A',
      amount: '$468',
      date: '15/12/2024',
      status: 'Hoàn thành'
    },
    {
      id: 'TX002',
      product: 'Mini Cooper Works',
      buyer: 'Trần Thị B',
      amount: '$360',
      date: '12/12/2024',
      status: 'Đang xử lý'
    },
    {
      id: 'TX003',
      product: 'Toyota Camry',
      buyer: 'Lê Văn C',
      amount: '$320',
      date: '10/12/2024',
      status: 'Hoàn thành'
    }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-50 via-slate-50 to-blue-50 text-zinc-900 relative'>
      {/* Background decorations */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-tr from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
      </div>

      <Header />

      <main className='container py-10 md:py-16 space-y-10 relative'>
        {/* Section 1: Personal Information Card */}
        <section className='rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl shadow-black/5 p-8 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] relative overflow-hidden group'>
          {/* Card background gradient */}
          <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

          <div className='flex items-center gap-6 relative z-10'>
            {/* Avatar */}
            <div className='size-24 rounded-full overflow-hidden ring-4 ring-gradient-to-br ring-blue-200/50 shadow-xl relative group'>
              <img
                src='https://randomuser.me/api/portraits/men/32.jpg'
                alt='User Avatar'
                className='size-full object-cover transition-transform duration-500 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </div>

            {/* User Info */}
            <div className='flex-1'>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-zinc-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2'>
                Nguyễn Văn Nam
              </h1>
              <p className='text-zinc-600 mb-4 text-lg'>nam.nguyen@example.com</p>
              <button className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md active:scale-95 relative overflow-hidden group'>
                <FaEdit className='transition-transform duration-300 group-hover:rotate-12' />
                <span className='relative z-10'>Chỉnh sửa thông tin</span>
                <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className='absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-60 animate-pulse'></div>
          <div className='absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-60 animate-pulse delay-700'></div>
        </section>

        {/* Section 2: My Products Grid */}
        <section className='space-y-8'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold bg-gradient-to-r from-zinc-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2'>
              Sản phẩm tôi đã đăng
            </h2>
            <div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full'></div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'>
            {userProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </section>

        {/* Section 3: Transaction History Table */}
        <section className='space-y-8'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold bg-gradient-to-r from-zinc-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent mb-2'>
              Lịch sử giao dịch
            </h2>
            <div className='w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full'></div>
          </div>
          <div className='rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl shadow-black/5 overflow-hidden hover:shadow-3xl transition-all duration-500'>
            <div className='bg-zinc-50 px-6 py-4 border-b border-zinc-200'>
              <h3 className='font-semibold text-zinc-900'>Giao dịch gần đây</h3>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-zinc-50'>
                  <tr className='divide-x divide-zinc-200'>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Mã GD
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Sản phẩm
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Người mua
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Số tiền
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Ngày
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-zinc-200'>
                  {transactionHistory.map((transaction) => (
                    <tr key={transaction.id} className='hover:bg-zinc-50'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900'>
                        {transaction.id}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-zinc-700'>{transaction.product}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-zinc-700'>{transaction.buyer}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-zinc-900'>
                        {transaction.amount}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-zinc-700'>{transaction.date}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            transaction.status === 'Hoàn thành'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProfilePage
