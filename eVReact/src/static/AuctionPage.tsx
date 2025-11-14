import { useEffect, useState } from 'react'
import { FaClock, FaGavel, FaHeart } from 'react-icons/fa'

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

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className='flex items-center justify-center gap-3 text-center'>
      <div className='bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl p-4 min-w-[70px] shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-pulse'></div>
        <div className='relative z-10'>
          <div className='text-2xl font-bold animate-pulse'>{timeLeft.days}</div>
          <div className='text-xs uppercase tracking-wider font-semibold'>Ngày</div>
        </div>
      </div>
      <div className='text-3xl font-bold text-red-500 animate-pulse'>:</div>
      <div className='bg-gradient-to-br from-orange-600 to-orange-700 text-white rounded-2xl p-4 min-w-[70px] shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-pulse delay-200'></div>
        <div className='relative z-10'>
          <div className='text-2xl font-bold animate-pulse'>{timeLeft.hours}</div>
          <div className='text-xs uppercase tracking-wider font-semibold'>Giờ</div>
        </div>
      </div>
      <div className='text-3xl font-bold text-orange-500 animate-pulse delay-100'>:</div>
      <div className='bg-gradient-to-br from-yellow-600 to-yellow-700 text-white rounded-2xl p-4 min-w-[70px] shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-pulse delay-400'></div>
        <div className='relative z-10'>
          <div className='text-2xl font-bold animate-pulse'>{timeLeft.minutes}</div>
          <div className='text-xs uppercase tracking-wider font-semibold'>Phút</div>
        </div>
      </div>
      <div className='text-3xl font-bold text-yellow-500 animate-pulse delay-200'>:</div>
      <div className='bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-4 min-w-[70px] shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden animate-pulse'>
        <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-pulse delay-600'></div>
        <div className='relative z-10'>
          <div className='text-2xl font-bold'>{timeLeft.seconds}</div>
          <div className='text-xs uppercase tracking-wider font-semibold'>Giây</div>
        </div>
      </div>
    </div>
  )
}

const AuctionPage = () => {
  const [bidAmount, setBidAmount] = useState('')
  const [currentPrice] = useState(45000)
  const [minBidIncrement] = useState(500)

  // Auction ends in 2 days from now
  const auctionEndDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)

  const recentBids = [
    { user: 'user_123', amount: 45000, time: '2 phút trước' },
    { user: 'car_lover_99', amount: 44500, time: '5 phút trước' },
    { user: 'speed_demon', amount: 44000, time: '8 phút trước' },
    { user: 'luxury_buyer', amount: 43500, time: '12 phút trước' },
    { user: 'auto_collector', amount: 43000, time: '15 phút trước' }
  ]

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const bid = parseInt(bidAmount)
    if (bid >= currentPrice + minBidIncrement) {
      alert(`Đặt giá thành công: $${bid.toLocaleString()}`)
      setBidAmount('')
    } else {
      alert(`Giá đặt phải ít nhất $${(currentPrice + minBidIncrement).toLocaleString()}`)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-50 via-orange-50 to-red-50 text-zinc-900 relative overflow-hidden'>
      {/* Background decorations */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-red-400/15 to-orange-600/15 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-tr from-yellow-400/15 to-red-600/15 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-500'></div>
      </div>

      <Header />

      <main className='container py-10 md:py-16 relative z-10'>
        <div className='max-w-4xl mx-auto space-y-8'>
          {/* Main Auction Card */}
          <div className='rounded-3xl border border-white/20 bg-white/90 backdrop-blur-xl shadow-2xl shadow-black/10 overflow-hidden hover:shadow-3xl transition-all duration-500 relative group'>
            {/* Pulsing border for urgency */}
            <div className='absolute inset-0 rounded-3xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 animate-pulse'></div>
            <div className='absolute inset-[2px] rounded-3xl bg-white/90 backdrop-blur-xl'></div>

            <div className='grid grid-cols-1 lg:grid-cols-2 relative z-10'>
              {/* Product Image */}
              <div className='aspect-[4/3] lg:aspect-auto relative overflow-hidden'>
                <img
                  src='https://images.unsplash.com/photo-1620246473111-e1e79601362e?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixlib=rb-4.0.3'
                  alt='Auction Product'
                  className='size-full object-cover transition-transform duration-700 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent'></div>

                {/* Live auction indicator */}
                <div className='absolute top-4 left-4 flex items-center gap-2 bg-red-500/90 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse'>
                  <div className='w-2 h-2 bg-white rounded-full animate-ping'></div>
                  LIVE AUCTION
                </div>
              </div>

              {/* Product Info */}
              <div className='p-8 space-y-6'>
                <div>
                  <h1 className='text-3xl font-bold bg-gradient-to-r from-zinc-900 via-red-800 to-orange-800 bg-clip-text text-transparent mb-2'>
                    Porsche 718 Cayman S
                  </h1>
                  <p className='text-zinc-600 text-lg'>Coupe thể thao, manual transmission, tình trạng như mới</p>
                </div>

                {/* Current Price */}
                <div className='text-center p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-200/50 relative overflow-hidden'>
                  <div className='absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 animate-pulse'></div>
                  <div className='relative z-10'>
                    <div className='text-sm text-red-600 mb-1 font-medium'>Giá hiện tại</div>
                    <div className='text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4 animate-pulse'>
                      ${currentPrice.toLocaleString()}
                    </div>
                    <div className='flex items-center justify-center gap-2 text-sm text-zinc-600'>
                      <FaClock className='text-red-500 animate-pulse' />
                      <span>Kết thúc đấu giá:</span>
                    </div>
                  </div>
                </div>

                {/* Countdown Timer */}
                <CountdownTimer targetDate={auctionEndDate} />

                {/* Bid Form */}
                <form onSubmit={handleBidSubmit} className='space-y-6'>
                  <div className='space-y-2 group'>
                    <label className='text-sm font-semibold text-zinc-700 group-focus-within:text-red-600 transition-colors'>
                      Nhập giá đặt (tối thiểu ${(currentPrice + minBidIncrement).toLocaleString()})
                    </label>
                    <div className='relative'>
                      <span className='absolute left-4 top-1/2 -translate-y-1/2 text-red-500 font-bold text-lg'>$</span>
                      <input
                        type='number'
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder={(currentPrice + minBidIncrement).toString()}
                        min={currentPrice + minBidIncrement}
                        step={minBidIncrement}
                        className='input-base pl-8 pr-4 py-4 text-lg font-semibold border-2 border-red-300 bg-white/80 backdrop-blur focus:ring-2 focus:ring-red-500 focus:border-red-500 hover:bg-white'
                        required
                      />
                      <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-red-500/0 to-red-500/0 group-focus-within:from-red-500/10 group-focus-within:via-orange-500/5 group-focus-within:to-yellow-500/10 transition-all duration-500 pointer-events-none'></div>
                    </div>
                  </div>
                  <button
                    type='submit'
                    className='w-full btn-accent rounded-xl px-6 py-4 text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg active:scale-95 relative overflow-hidden group animate-pulse'
                  >
                    <span className='relative z-10 flex items-center justify-center gap-3'>
                      <FaGavel className='transition-transform duration-300 group-hover:rotate-12' />
                      ĐẶT GIÁ NGAY
                    </span>
                    <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Recent Bids */}
          <div className='rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden'>
            <div className='px-6 py-4 border-b border-zinc-200'>
              <h2 className='text-lg font-semibold'>Lịch sử đấu giá gần đây</h2>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-zinc-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Người đấu giá
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Giá đặt
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider'>
                      Thời gian
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-zinc-200'>
                  {recentBids.map((bid, index) => (
                    <tr key={index} className={`hover:bg-zinc-50 ${index === 0 ? 'bg-green-50' : ''}`}>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center gap-3'>
                          <div className='size-8 rounded-full bg-zinc-200 flex items-center justify-center text-sm font-medium text-zinc-700'>
                            {bid.user.charAt(0).toUpperCase()}
                          </div>
                          <span className='font-medium text-zinc-900'>{bid.user}</span>
                          {index === 0 && (
                            <span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'>
                              Cao nhất
                            </span>
                          )}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-lg font-semibold text-zinc-900'>
                        ${bid.amount.toLocaleString()}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-zinc-600'>{bid.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Auction Rules */}
          <div className='rounded-2xl border border-zinc-200 bg-white shadow-sm p-6'>
            <h2 className='text-lg font-semibold mb-4'>Quy định đấu giá</h2>
            <ul className='space-y-2 text-sm text-zinc-700'>
              <li>• Mức tăng giá tối thiểu: ${minBidIncrement.toLocaleString()}</li>
              <li>• Người đấu giá cao nhất khi hết thời gian sẽ thắng</li>
              <li>• Thanh toán trong vòng 24h sau khi thắng đấu giá</li>
              <li>• Phí đấu giá: 5% giá trị sản phẩm</li>
              <li>• Không được rút lại lệnh đấu giá sau khi đặt</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AuctionPage
