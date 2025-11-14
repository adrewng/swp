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

const LoginPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-50 via-blue-50 to-indigo-100 text-zinc-900 relative overflow-hidden'>
      {/* Background decorations */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500'></div>
      </div>

      <Header />

      {/* Full screen layout with centered card form */}
      <main className='relative flex items-center justify-center min-h-[calc(100vh-4rem)] px-4'>
        <div className='rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl shadow-black/10 p-8 w-full max-w-md transform hover:scale-105 transition-all duration-500 hover:shadow-3xl'>
          <div className='text-center mb-8'>
            <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg'>
              <FaHeart className='text-white text-2xl animate-pulse' />
            </div>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-zinc-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-2'>
              Đăng nhập
            </h1>
            <p className='text-zinc-600'>Chào mừng bạn quay trở lại!</p>
          </div>

          <form className='space-y-6'>
            {/* Email Input */}
            <div className='space-y-1 group'>
              <label className='text-sm font-medium text-zinc-700 group-focus-within:text-blue-600 transition-colors'>
                Email
              </label>
              <div className='relative'>
                <input
                  type='email'
                  placeholder='Nhập email của bạn'
                  className='w-full rounded-xl border border-zinc-300 bg-white/50 backdrop-blur px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-white/70 focus:bg-white'
                  required
                />
                <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-focus-within:from-blue-500/10 group-focus-within:via-purple-500/5 group-focus-within:to-indigo-500/10 transition-all duration-500 pointer-events-none'></div>
              </div>
            </div>

            {/* Password Input */}
            <div className='space-y-1 group'>
              <label className='text-sm font-medium text-zinc-700 group-focus-within:text-blue-600 transition-colors'>
                Mật khẩu
              </label>
              <div className='relative'>
                <input
                  type='password'
                  placeholder='Nhập mật khẩu'
                  className='w-full rounded-xl border border-zinc-300 bg-white/50 backdrop-blur px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-white/70 focus:bg-white'
                  required
                />
                <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-focus-within:from-blue-500/10 group-focus-within:via-purple-500/5 group-focus-within:to-indigo-500/10 transition-all duration-500 pointer-events-none'></div>
              </div>
            </div>

            {/* Login Button */}
            <button
              type='submit'
              className='w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white rounded-xl px-4 py-3 font-semibold hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg active:scale-95 relative overflow-hidden group'
            >
              <span className='relative z-10'>Đăng nhập</span>
              <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
            </button>
          </form>

          {/* Footer Links */}
          <div className='mt-8 text-center space-y-4'>
            <a
              href='#'
              className='text-sm text-zinc-600 hover:text-blue-600 transition-colors duration-300 hover:scale-105 transform inline-block'
            >
              Quên mật khẩu?
            </a>
            <div className='text-sm text-zinc-600'>
              Chưa có tài khoản?{' '}
              <a
                href='#'
                className='text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300 hover:underline decoration-2 underline-offset-2'
              >
                Đăng ký ngay
              </a>
            </div>
          </div>

          {/* Decorative elements */}
          <div className='absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-60 animate-bounce delay-700'></div>
          <div className='absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-60 animate-bounce delay-1000'></div>
        </div>
      </main>
    </div>
  )
}

export default LoginPage
