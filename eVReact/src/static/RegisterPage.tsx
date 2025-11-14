import { FaHeart } from 'react-icons/fa'

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

const RegisterPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-50 via-emerald-50 to-teal-100 text-zinc-900 relative overflow-hidden'>
      {/* Background decorations */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-emerald-600/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-teal-400/10 to-green-600/10 rounded-full blur-3xl animate-pulse delay-500'></div>
      </div>

      <Header />

      {/* Full screen layout with centered card form */}
      <main className='relative flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8'>
        <div className='rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl shadow-black/10 p-8 w-full max-w-md transform hover:scale-105 transition-all duration-500 hover:shadow-3xl relative'>
          <div className='text-center mb-8'>
            <div className='w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg'>
              <FaHeart className='text-white text-2xl animate-pulse' />
            </div>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-zinc-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent mb-2'>
              Đăng ký
            </h1>
            <p className='text-zinc-600'>Tạo tài khoản mới để bắt đầu</p>
          </div>

          <form className='space-y-6'>
            {/* Họ tên Input */}
            <div className='space-y-1'>
              <label className='text-sm font-medium text-zinc-700'>Họ và tên</label>
              <input
                type='text'
                placeholder='Nhập họ và tên'
                className='w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900'
                required
              />
            </div>

            {/* Email Input */}
            <div className='space-y-1'>
              <label className='text-sm font-medium text-zinc-700'>Email</label>
              <input
                type='email'
                placeholder='Nhập email của bạn'
                className='w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900'
                required
              />
            </div>

            {/* Số điện thoại Input */}
            <div className='space-y-1'>
              <label className='text-sm font-medium text-zinc-700'>Số điện thoại</label>
              <input
                type='tel'
                placeholder='Nhập số điện thoại'
                className='w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900'
                required
              />
            </div>

            {/* Password Input */}
            <div className='space-y-1'>
              <label className='text-sm font-medium text-zinc-700'>Mật khẩu</label>
              <input
                type='password'
                placeholder='Nhập mật khẩu'
                className='w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900'
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div className='space-y-1'>
              <label className='text-sm font-medium text-zinc-700'>Xác nhận mật khẩu</label>
              <input
                type='password'
                placeholder='Nhập lại mật khẩu'
                className='w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900'
                required
              />
            </div>

            {/* Register Button */}
            <button
              type='submit'
              className='w-full bg-zinc-900 text-white rounded-xl px-4 py-3 font-medium hover:bg-zinc-800 transition-colors'
            >
              Đăng ký
            </button>
          </form>

          {/* Footer Links */}
          <div className='mt-6 text-center'>
            <div className='text-sm text-zinc-600'>
              Đã có tài khoản?{' '}
              <a href='#' className='text-zinc-900 font-medium hover:underline'>
                Đăng nhập
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default RegisterPage
