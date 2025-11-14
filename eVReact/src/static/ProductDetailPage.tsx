import { useState } from 'react'
import { FaCalendar, FaCog, FaHeart, FaStar, FaTachometerAlt, FaUsers } from 'react-icons/fa'

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

const ProductDetailPage = () => {
  const [activeTab, setActiveTab] = useState('specs')

  const productImages = [
    'https://images.unsplash.com/photo-1620246473111-e1e79601362e?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1596489397666-e8224749622d?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1607599026771-337d10c0e527?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixlib=rb-4.0.3'
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const specs = [
    { label: 'Hãng xe', value: 'Porsche' },
    { label: 'Dòng xe', value: '718 Cayman S' },
    { label: 'Năm sản xuất', value: '2022' },
    { label: 'Số km đã đi', value: '15,000 km' },
    { label: 'Dung lượng pin', value: '75 kWh' },
    { label: 'Hộp số', value: 'Manual' },
    { label: 'Số chỗ ngồi', value: '2 chỗ' },
    { label: 'Màu sắc', value: 'Đỏ' }
  ]

  const reviews = [
    { user: 'Nguyễn Văn A', rating: 5, comment: 'Xe rất đẹp và chạy mượt mà!', date: '15/12/2024' },
    { user: 'Trần Thị B', rating: 4, comment: 'Chất lượng tốt, giá hợp lý.', date: '12/12/2024' },
    { user: 'Lê Văn C', rating: 5, comment: 'Rất hài lòng với sản phẩm này.', date: '10/12/2024' }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-50 via-blue-50 to-indigo-50 text-zinc-900 relative overflow-hidden'>
      {/* Background decorations */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-tr from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
      </div>

      <Header />

      <main className='container py-10 md:py-16 relative z-10'>
        {/* 2 Column Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10'>
          {/* Left Column - Product Images */}
          <div className='space-y-6'>
            {/* Main Image */}
            <div className='aspect-[4/3] rounded-3xl overflow-hidden bg-white/80 backdrop-blur border border-white/20 shadow-2xl shadow-black/10 relative group'>
              <img
                src={productImages[currentImageIndex]}
                alt='Product'
                className='size-full object-cover transition-transform duration-700 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

              {/* Image indicators */}
              <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
                {productImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className='grid grid-cols-3 gap-4'>
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    currentImageIndex === index
                      ? 'border-blue-500 shadow-lg shadow-blue-500/25 scale-105'
                      : 'border-zinc-200 hover:border-blue-300'
                  }`}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className='size-full object-cover' />
                  {currentImageIndex === index && (
                    <div className='absolute inset-0 bg-blue-500/20 flex items-center justify-center'>
                      <div className='w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center'>
                        <span className='text-white text-xs font-bold'>✓</span>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Information */}
          <div className='space-y-6'>
            <div>
              <h1 className='text-3xl font-bold text-zinc-900 mb-2'>Porsche 718 Cayman S</h1>
              <p className='text-zinc-600'>Coupe • Manual • 2 chỗ ngồi</p>
            </div>

            {/* Price and Status */}
            <div className='flex items-center justify-between'>
              <div className='text-3xl font-bold text-zinc-900'>$68,000</div>
              <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium'>Còn hàng</span>
            </div>

            {/* Quick Info */}
            <div className='grid grid-cols-2 gap-4 p-4 bg-zinc-100 rounded-xl'>
              <div className='flex items-center gap-2 text-sm text-zinc-700'>
                <FaCalendar />
                <span>Năm SX: 2022</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-zinc-700'>
                <FaTachometerAlt />
                <span>15,000 km</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-zinc-700'>
                <FaUsers />
                <span>2 chỗ ngồi</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-zinc-700'>
                <FaCog />
                <span>Manual</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-4'>
              <button className='flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl px-6 py-4 font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg active:scale-95 relative overflow-hidden group'>
                <span className='relative z-10'>MUA NGAY</span>
                <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
              </button>
              <button className='flex-1 border-2 border-orange-500 rounded-2xl px-6 py-4 font-bold hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg active:scale-95 relative overflow-hidden group'>
                <span className='relative z-10 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent group-hover:text-white transition-all duration-300'>
                  ĐẤU GIÁ
                </span>
                <div className='absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </button>
            </div>

            {/* Seller Info */}
            <div className='p-4 bg-white rounded-xl border border-zinc-200'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='size-12 rounded-full overflow-hidden ring-2 ring-zinc-200'>
                  <img
                    src='https://randomuser.me/api/portraits/men/32.jpg'
                    alt='Seller'
                    className='size-full object-cover'
                  />
                </div>
                <div>
                  <h3 className='font-semibold'>Nguyễn Văn Nam</h3>
                  <div className='flex items-center gap-1 text-sm text-amber-500'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    <span className='text-zinc-600 ml-1'>(4.8)</span>
                  </div>
                </div>
              </div>
              <button className='w-full border border-zinc-300 text-zinc-700 rounded-xl px-4 py-2 text-sm font-medium hover:bg-zinc-50 transition-colors'>
                Liên hệ người bán
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className='rounded-2xl border border-zinc-200 bg-white overflow-hidden'>
          {/* Tab Headers */}
          <div className='flex border-b border-zinc-200'>
            <button
              onClick={() => setActiveTab('specs')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'specs' ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              Thông số kỹ thuật
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'reviews'
                  ? 'bg-zinc-900 text-white'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              Đánh giá ({reviews.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className='p-6'>
            {activeTab === 'specs' && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {specs.map((spec, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center py-3 border-b border-zinc-100 last:border-b-0'
                  >
                    <span className='text-zinc-600'>{spec.label}</span>
                    <span className='font-medium text-zinc-900'>{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className='space-y-6'>
                {reviews.map((review, index) => (
                  <div key={index} className='border-b border-zinc-100 pb-6 last:border-b-0 last:pb-0'>
                    <div className='flex items-center justify-between mb-3'>
                      <div className='flex items-center gap-3'>
                        <div className='size-10 rounded-full bg-zinc-200 flex items-center justify-center font-medium text-zinc-700'>
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <h4 className='font-medium'>{review.user}</h4>
                          <div className='flex items-center gap-1 text-sm text-amber-500'>
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <FaStar key={i} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className='text-sm text-zinc-500'>{review.date}</span>
                    </div>
                    <p className='text-zinc-700'>{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductDetailPage
