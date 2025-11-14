import { useState } from 'react'
import { FaCreditCard, FaHeart, FaLock, FaUniversity, FaWallet } from 'react-icons/fa'

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

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const productDetails = {
    name: 'Porsche 718 Cayman S',
    price: 68000,
    image:
      'https://images.unsplash.com/photo-1620246473111-e1e79601362e?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&h=300&fit=crop&ixlib=rb-4.0.3'
  }

  const fees = {
    serviceFee: 3400, // 5% service fee
    tax: 6800 // 10% tax
  }

  const total = productDetails.price + fees.serviceFee + fees.tax

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreedToTerms) {
      alert('Vui lòng đồng ý với điều khoản và điều kiện')
      return
    }
    alert('Thanh toán thành công!')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-50 via-green-50 to-emerald-50 text-zinc-900 relative overflow-hidden'>
      {/* Background decorations */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-green-400/10 to-emerald-600/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-tr from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-teal-400/5 to-green-600/5 rounded-full blur-3xl animate-pulse delay-500'></div>
      </div>

      <Header />

      <main className='relative flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8'>
        <div className='w-full max-w-2xl space-y-8'>
          {/* Progress Indicator */}
          <div className='rounded-2xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-lg p-6'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                  1
                </div>
                <span className='font-semibold text-green-600'>Thông tin đơn hàng</span>
              </div>
              <div className='flex-1 mx-4 h-1 bg-green-200 rounded-full overflow-hidden'>
                <div className='h-full bg-gradient-to-r from-green-500 to-emerald-500 w-1/2 animate-pulse'></div>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm animate-pulse'>
                  2
                </div>
                <span className='font-semibold text-blue-600'>Thanh toán</span>
              </div>
              <div className='flex-1 mx-4 h-1 bg-zinc-200 rounded-full'></div>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-zinc-300 rounded-full flex items-center justify-center text-zinc-500 font-bold text-sm'>
                  3
                </div>
                <span className='text-zinc-500'>Hoàn thành</span>
              </div>
            </div>
          </div>
          {/* Order Summary */}
          <div className='rounded-3xl border border-white/20 bg-white/90 backdrop-blur-xl shadow-2xl shadow-black/5 p-8 hover:shadow-3xl transition-all duration-500 relative overflow-hidden group'>
            <div className='absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

            <div className='relative z-10'>
              <h2 className='text-2xl font-bold bg-gradient-to-r from-zinc-900 via-green-800 to-emerald-800 bg-clip-text text-transparent mb-6'>
                Tóm tắt đơn hàng
              </h2>
              <div className='flex items-center gap-6 mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200/50'>
                <div className='relative'>
                  <img
                    src={productDetails.image}
                    alt={productDetails.name}
                    className='w-24 h-20 rounded-xl object-cover shadow-md'
                  />
                  <div className='absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse'>
                    ✓
                  </div>
                </div>
                <div className='flex-1'>
                  <h3 className='font-bold text-lg text-zinc-900'>{productDetails.name}</h3>
                  <p className='text-zinc-600'>Coupe • Manual • 2022</p>
                  <div className='flex items-center gap-2 mt-2'>
                    <span className='bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium'>
                      Verified
                    </span>
                    <span className='bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium'>
                      Premium
                    </span>
                  </div>
                </div>
                <div className='text-right'>
                  <div className='text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
                    ${productDetails.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className='border-t border-zinc-200 pt-4 space-y-2'>
              <div className='flex justify-between text-sm'>
                <span className='text-zinc-600'>Giá sản phẩm</span>
                <span>${productDetails.price.toLocaleString()}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-zinc-600'>Phí dịch vụ (5%)</span>
                <span>${fees.serviceFee.toLocaleString()}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-zinc-600'>Thuế (10%)</span>
                <span>${fees.tax.toLocaleString()}</span>
              </div>
              <div className='border-t border-zinc-200 pt-2 flex justify-between font-semibold text-lg'>
                <span>Tổng cộng</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className='rounded-3xl border border-white/20 bg-white/90 backdrop-blur-xl shadow-2xl shadow-black/5 p-8 hover:shadow-3xl transition-all duration-500 relative overflow-hidden group'>
            <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

            <div className='flex items-center gap-3 mb-8 relative z-10'>
              <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg'>
                <FaLock className='text-white animate-pulse' />
              </div>
              <h2 className='text-2xl font-bold bg-gradient-to-r from-zinc-900 via-blue-800 to-purple-800 bg-clip-text text-transparent'>
                Thông tin thanh toán
              </h2>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Payment Method Selection */}
              <div className='space-y-3'>
                <label className='text-sm font-medium text-zinc-700'>Phương thức thanh toán</label>

                <div className='space-y-3'>
                  {/* Credit Card */}
                  <label className='flex items-center gap-3 p-4 border border-zinc-300 rounded-xl cursor-pointer hover:bg-zinc-50 transition-colors'>
                    <input
                      type='radio'
                      name='payment'
                      value='card'
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className='text-zinc-900 focus:ring-zinc-900'
                    />
                    <FaCreditCard className='text-zinc-600' />
                    <span className='font-medium'>Thẻ tín dụng/ghi nợ</span>
                  </label>

                  {/* Bank Transfer */}
                  <label className='flex items-center gap-3 p-4 border border-zinc-300 rounded-xl cursor-pointer hover:bg-zinc-50 transition-colors'>
                    <input
                      type='radio'
                      name='payment'
                      value='banking'
                      checked={paymentMethod === 'banking'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className='text-zinc-900 focus:ring-zinc-900'
                    />
                    <FaUniversity className='text-zinc-600' />
                    <span className='font-medium'>Chuyển khoản ngân hàng</span>
                  </label>

                  {/* E-wallet */}
                  <label className='flex items-center gap-3 p-4 border border-zinc-300 rounded-xl cursor-pointer hover:bg-zinc-50 transition-colors'>
                    <input
                      type='radio'
                      name='payment'
                      value='ewallet'
                      checked={paymentMethod === 'ewallet'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className='text-zinc-900 focus:ring-zinc-900'
                    />
                    <FaWallet className='text-zinc-600' />
                    <span className='font-medium'>Ví điện tử</span>
                  </label>
                </div>
              </div>

              {/* Card Details (only show when card is selected) */}
              {paymentMethod === 'card' && (
                <div className='space-y-4 p-4 bg-zinc-50 rounded-xl'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='md:col-span-2 space-y-1'>
                      <label className='text-sm font-medium text-zinc-700'>Số thẻ</label>
                      <input
                        type='text'
                        placeholder='1234 5678 9012 3456'
                        maxLength={19}
                        className='input-base'
                        required
                      />
                    </div>

                    <div className='space-y-1'>
                      <label className='text-sm font-medium text-zinc-700'>Tên chủ thẻ</label>
                      <input type='text' placeholder='NGUYEN VAN NAM' className='input-base' required />
                    </div>

                    <div className='space-y-1'>
                      <label className='text-sm font-medium text-zinc-700'>Ngày hết hạn</label>
                      <input type='text' placeholder='MM/YY' maxLength={5} className='input-base' required />
                    </div>

                    <div className='space-y-1'>
                      <label className='text-sm font-medium text-zinc-700'>CVV</label>
                      <input type='text' placeholder='123' maxLength={4} className='input-base' required />
                    </div>
                  </div>
                </div>
              )}

              {/* Banking Details */}
              {paymentMethod === 'banking' && (
                <div className='p-4 bg-zinc-50 rounded-xl'>
                  <h3 className='font-medium mb-3'>Thông tin chuyển khoản</h3>
                  <div className='space-y-2 text-sm'>
                    <p>
                      <strong>Ngân hàng:</strong> Vietcombank
                    </p>
                    <p>
                      <strong>Số tài khoản:</strong> 1234567890
                    </p>
                    <p>
                      <strong>Chủ tài khoản:</strong> OPTIMUM COMPANY
                    </p>
                    <p>
                      <strong>Nội dung:</strong> CHECKOUT {Date.now()}
                    </p>
                  </div>
                </div>
              )}

              {/* E-wallet Details */}
              {paymentMethod === 'ewallet' && (
                <div className='p-4 bg-zinc-50 rounded-xl'>
                  <h3 className='font-medium mb-3'>Chọn ví điện tử</h3>
                  <div className='grid grid-cols-2 gap-3'>
                    <button
                      type='button'
                      className='p-3 border border-zinc-300 rounded-xl hover:bg-white transition-colors'
                    >
                      MoMo
                    </button>
                    <button
                      type='button'
                      className='p-3 border border-zinc-300 rounded-xl hover:bg-white transition-colors'
                    >
                      ZaloPay
                    </button>
                    <button
                      type='button'
                      className='p-3 border border-zinc-300 rounded-xl hover:bg-white transition-colors'
                    >
                      ViettelPay
                    </button>
                    <button
                      type='button'
                      className='p-3 border border-zinc-300 rounded-xl hover:bg-white transition-colors'
                    >
                      ShopeePay
                    </button>
                  </div>
                </div>
              )}

              {/* Terms Agreement */}
              <div className='flex items-start gap-3'>
                <input
                  type='checkbox'
                  id='terms'
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className='mt-1 size-4 text-zinc-900 focus:ring-zinc-900'
                  required
                />
                <label htmlFor='terms' className='text-sm text-zinc-700'>
                  Tôi đồng ý với{' '}
                  <a href='#' className='text-zinc-900 font-medium hover:underline'>
                    Điều khoản và Điều kiện
                  </a>{' '}
                  cũng như{' '}
                  <a href='#' className='text-zinc-900 font-medium hover:underline'>
                    Chính sách Bảo mật
                  </a>{' '}
                  của OPTIMUM
                </label>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                className='w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-2xl px-8 py-5 text-xl font-bold hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl active:scale-95 relative overflow-hidden group'
              >
                <span className='relative z-10 flex items-center justify-center gap-3'>
                  <FaLock className='transition-transform duration-300 group-hover:rotate-12' />
                  THANH TOÁN ${total.toLocaleString()}
                </span>
                <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>

                {/* Success animation elements */}
                <div className='absolute top-1/2 left-1/4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping'></div>
                <div className='absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping delay-200'></div>
              </button>
            </form>
          </div>

          {/* Security Notice */}
          <div className='text-center'>
            <div className='inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-2xl px-6 py-4 shadow-lg'>
              <div className='w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center'>
                <FaLock className='text-white text-sm animate-pulse' />
              </div>
              <p className='text-sm font-medium text-green-800'>
                Thông tin thanh toán của bạn được bảo mật bằng mã hóa SSL 256-bit
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CheckoutPage
