import { FaHeart, FaUpload } from 'react-icons/fa'

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

const CreateListingPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-50 via-violet-50 to-purple-50 text-zinc-900 relative overflow-hidden'>
      {/* Background decorations */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-violet-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-tr from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
      </div>

      <Header />

      <main className='container py-10 md:py-16 relative z-10'>
        <div className='max-w-4xl mx-auto'>
          <div className='mb-10 text-center'>
            <div className='w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg'>
              <FaUpload className='text-white text-2xl animate-pulse' />
            </div>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-zinc-900 via-violet-800 to-purple-800 bg-clip-text text-transparent mb-3'>
              Đăng tin bán sản phẩm
            </h1>
            <p className='text-zinc-600 text-lg'>Điền thông tin chi tiết để thu hút người mua</p>
            <div className='w-32 h-1 bg-gradient-to-r from-violet-500 to-purple-500 mx-auto rounded-full mt-3'></div>
          </div>

          {/* Form Card */}
          <div className='rounded-3xl border border-white/20 bg-white/90 backdrop-blur-xl shadow-2xl shadow-black/5 p-10 hover:shadow-3xl transition-all duration-500 relative overflow-hidden group'>
            <div className='absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
            <form className='space-y-8'>
              {/* Form Grid - 2 columns on desktop, 1 column on mobile */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {/* Left Column */}
                <div className='space-y-6'>
                  {/* Tên sản phẩm */}
                  <div className='space-y-1'>
                    <label className='text-sm font-medium text-zinc-700'>Tên sản phẩm *</label>
                    <input type='text' placeholder='VD: Porsche 911 Turbo' className='input-base' required />
                  </div>

                  {/* Hãng */}
                  <div className='space-y-1'>
                    <label className='text-sm font-medium text-zinc-700'>Hãng xe *</label>
                    <input type='text' placeholder='VD: Porsche, BMW, Toyota' className='input-base' required />
                  </div>

                  {/* Năm sản xuất */}
                  <div className='space-y-1'>
                    <label className='text-sm font-medium text-zinc-700'>Năm sản xuất *</label>
                    <input type='number' placeholder='VD: 2020' min='1990' max='2025' className='input-base' required />
                  </div>

                  {/* Upload ảnh */}
                  <div className='space-y-1'>
                    <label className='text-sm font-medium text-zinc-700'>Hình ảnh sản phẩm *</label>
                    <div className='border-2 border-dashed border-zinc-300 rounded-xl p-6 text-center hover:border-zinc-400 transition-colors'>
                      <FaUpload className='mx-auto text-2xl text-zinc-400 mb-2' />
                      <p className='text-sm text-zinc-600 mb-2'>Kéo thả ảnh vào đây hoặc</p>
                      <input type='file' multiple accept='image/*' className='hidden' id='image-upload' />
                      <label
                        htmlFor='image-upload'
                        className='inline-block bg-zinc-900 text-white px-4 py-2 rounded-xl text-sm font-medium cursor-pointer hover:bg-zinc-800 transition-colors'
                      >
                        Chọn ảnh
                      </label>
                      <p className='text-xs text-zinc-500 mt-2'>Tối đa 10 ảnh, mỗi ảnh không quá 5MB</p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className='space-y-6'>
                  {/* Dung lượng pin */}
                  <div className='space-y-1'>
                    <label className='text-sm font-medium text-zinc-700'>Dung lượng pin (kWh)</label>
                    <input type='number' placeholder='VD: 75' step='0.1' className='input-base' />
                  </div>

                  {/* Giá mong muốn */}
                  <div className='space-y-1'>
                    <label className='text-sm font-medium text-zinc-700'>Giá mong muốn (USD) *</label>
                    <input type='number' placeholder='VD: 50000' min='0' step='100' className='input-base' required />
                  </div>

                  {/* Số km đã đi */}
                  <div className='space-y-1'>
                    <label className='text-sm font-medium text-zinc-700'>Số km đã đi</label>
                    <input type='number' placeholder='VD: 15000' min='0' className='input-base' />
                  </div>

                  {/* Tình trạng */}
                  <div className='space-y-1'>
                    <label className='text-sm font-medium text-zinc-700'>Tình trạng xe *</label>
                    <select className='input-base' required>
                      <option value=''>Chọn tình trạng</option>
                      <option value='new'>Mới</option>
                      <option value='like-new'>Như mới</option>
                      <option value='good'>Tốt</option>
                      <option value='fair'>Khá</option>
                      <option value='needs-repair'>Cần sửa chữa</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Mô tả - Full width */}
              <div className='space-y-1'>
                <label className='text-sm font-medium text-zinc-700'>Mô tả chi tiết</label>
                <textarea
                  rows={6}
                  placeholder='Mô tả chi tiết về sản phẩm: đặc điểm nổi bật, tình trạng, lịch sử sử dụng, lý do bán...'
                  className='input-base resize-none'
                />
              </div>

              {/* Submit Button */}
              <div className='pt-6 relative z-10'>
                <button
                  type='submit'
                  className='w-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white rounded-2xl px-8 py-5 text-xl font-bold hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl active:scale-95 relative overflow-hidden group'
                >
                  <span className='relative z-10 flex items-center justify-center gap-3'>
                    <FaUpload className='transition-transform duration-300 group-hover:rotate-12' />
                    ĐĂNG TIN BÁN SẢN PHẨM
                  </span>
                  <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>

                  {/* Success animation elements */}
                  <div className='absolute top-1/2 left-1/4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping'></div>
                  <div className='absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping delay-200'></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CreateListingPage
