import { Link } from 'react-router-dom'
import { path } from '~/constants/path'
import logoUrl from '~/shared/logo.svg'

export default function Footer() {
  return (
    <div className='min-h-full flex items-center justify-center bg-zinc-950'>
      <footer className='w-full bg-gradient-to-b from-zinc-900 to-zinc-950 text-zinc-300'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 gap-y-8 md:gap-8 py-16 max-w-sm mx-auto sm:max-w-3xl lg:max-w-full'>
            {/* Brand */}
            <div className='col-span-full mb-10 lg:col-span-2 lg:mb-0'>
              <a
                href='https://themedevhub.com'
                target='_blank'
                className='flex justify-center items-center lg:justify-start text-3xl font-bold'
              >
                {/* <img
                  src={logoUrl}
                  alt='EViest'
                  className='block select-none object-contain text-white'
                  style={{ width: '120px', height: '60px' }}
                /> */}
                <img src={logoUrl} className='h-10 w-auto brightness-0 invert' />
              </a>
              <p className='py-8 text-zinc-400 lg:max-w-xs text-center lg:text-left'>
                Nền tảng mua bán xe điện & pin đã qua sử dụng. An toàn, minh bạch, phí thấp
              </p>
              {/* <a
                href='#contact'
                className='py-2.5 px-5 block w-fit rounded-full shadow-sm mx-auto lg:mx-0 font-semibold
                           bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/60
                           transition'
              >
                Contact us
              </a> */}
            </div>

            {/* Col */}
            <div className='lg:mx-auto text-left'>
              <h4 className='text-lg text-white font-medium mb-7'>Trang</h4>
              <ul>
                <li className='mb-6'>
                  <Link to={path.home} className='text-zinc-400 hover:text-white transition'>
                    Trang chủ
                  </Link>
                </li>
                <li className='mb-6'>
                  <Link to={path.vehicle} className='text-zinc-400 hover:text-white transition'>
                    Xe
                  </Link>
                </li>
                <li>
                  <Link to={path.battery} className='text-zinc-400 hover:text-white transition'>
                    Pin
                  </Link>
                </li>
              </ul>
            </div>

            <div className='lg:mx-auto text-left'>
              <h4 className='text-lg text-white font-medium mb-7'>Dịch vụ</h4>
              <ul>
                <li className='mb-6'>
                  <Link to={path.post} className='text-zinc-400 hover:text-white transition'>
                    Đăng tin sản phẩm
                  </Link>
                </li>
                <li className='mb-6'>
                  <Link to={path.pricing} className='text-zinc-400 hover:text-white transition'>
                    Mua gói
                  </Link>
                </li>
                <li>
                  <Link to={path.auction} className='text-zinc-400 hover:text-white transition'>
                    Đấu giá sản phẩm
                  </Link>
                </li>
              </ul>
            </div>

            <div className='lg:mx-auto text-left'>
              <h4 className='text-lg text-white font-medium mb-7'>Quản lí</h4>
              <ul>
                <li className='mb-6'>
                  <Link to={path.accountProfile} className='text-zinc-400 hover:text-white transition'>
                    Quản lí hồ sơ cá nhân
                  </Link>
                </li>
                <li className='mb-6'>
                  <Link to={path.accountPosts} className='text-zinc-400 hover:text-white transition'>
                    Quản lí bài viết
                  </Link>
                </li>
                <li>
                  <Link to={path.accountNotification} className='text-zinc-400 hover:text-white transition'>
                    Quản lí thông báo
                  </Link>
                </li>
              </ul>
            </div>

            <div className='lg:mx-auto text-left'>
              <h4 className='text-lg text-white font-medium mb-7'>Đăng kí</h4>
              <p className='text-zinc-400 leading-6 mb-7'>Đăng kí để nhận được các tin đăng mới nhất từ chúng tôi</p>
              <Link
                to={path.register}
                className='flex items-center justify-center gap-2 rounded-full py-3 px-6 w-fit font-semibold
                           border border-zinc-600 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-500
                           focus:outline-none focus:ring-2 focus:ring-zinc-400/60 transition'
              >
                Đăng ký
                <svg width={15} height={12} viewBox='0 0 15 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M1.25 6L13.25 6M9.5 10.5L13.4697 6.53033C13.7197 6.28033 13.8447 6.15533 13.8447 6C13.8447 5.84467 13.7197 5.71967 13.4697 5.46967L9.5 1.5'
                    stroke='currentColor'
                    strokeWidth='1.8'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div className='py-7 border-t border-zinc-800'>
            <div className='flex items-center justify-center flex-col lg:justify-between lg:flex-row gap-3'>
              <span className='text-zinc-400'>
                ©
                <Link to={path.home} className='text-indigo-400 hover:text-indigo-300'>
                  EViest
                </Link>{' '}
                {new Date().getFullYear()}, giữ mọi quyền.
              </span>

              <div className='flex mt-1 space-x-3 sm:justify-center lg:mt-0'>
                <a
                  href='#'
                  className='w-8 h-8 rounded-full flex justify-center items-center bg-sky-500/80 hover:bg-sky-500 transition'
                >
                  {/* X/Twitter-like icon */}
                  <svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} viewBox='0 0 20 20' fill='none'>
                    <path
                      d='M11.321 8.937 16.492 3.056h-1.225l-4.49 5.106L7.191 3.056H3.056l5.422 7.722-5.422 6.167h1.225l4.741-5.393 3.787 5.393h4.136L11.321 8.937Z'
                      fill='white'
                    />
                  </svg>
                </a>

                <a
                  href='#'
                  className='w-8 h-8 rounded-full flex justify-center items-center bg-gradient-to-tr from-yellow-400 via-pink-500 to-violet-700 hover:opacity-90 transition'
                >
                  <svg
                    className='w-[1.25rem] h-[1.125rem] text-white'
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M5.634 7.997a2.368 2.368 0 1 1 4.736 0 2.368 2.368 0 0 1-4.736 0Z' fill='white' />
                  </svg>
                </a>

                <a
                  href='#'
                  className='w-8 h-8 rounded-full flex justify-center items-center bg-blue-600 hover:bg-blue-500 transition'
                >
                  <svg
                    className='w-[1rem] h-[1rem] text-white'
                    viewBox='0 0 8 14'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M7.041 7.812 7.412 5.46H5.13V3.932c0-.643.318-1.271 1.337-1.271h1.052V.658C6.906.56 6.287.508 5.667.5 3.789.5 2.562 1.628 2.562 3.667V5.46H.48v2.352h2.082V13.5H5.13V7.812h1.912Z'
                      fill='currentColor'
                    />
                  </svg>
                </a>

                <a
                  href='#'
                  className='w-8 h-8 rounded-full flex justify-center items-center bg-red-600 hover:bg-red-500 transition'
                >
                  <svg
                    className='w-[1.25rem] h-[0.875rem] text-white'
                    viewBox='0 0 16 12'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M13.919 1.107c.639.172 1.141.675 1.311 1.314.309 1.159.309 3.577.309 3.577s0 2.418-.309 3.576a1.86 1.86 0 0 1-1.311 1.314C12.764 11.197 8.129 11.197 8.129 11.197s-4.633 0-5.79-.31A1.86 1.86 0 0 1 1.028 9.573C.719 8.415.719 5.997.719 5.997s0-2.418.309-3.576c.172-.641.674-1.144 1.311-1.314C3.496.797 8.129.797 8.129.797s4.634 0 5.79.31Zm-3.421 4.89-3.85 2.23V3.768l3.85 2.229Z'
                      fill='white'
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
