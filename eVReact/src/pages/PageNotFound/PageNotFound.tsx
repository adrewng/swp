import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import page_not_found from '~/assets/page_not_found.jpg'

const PageNotFound = () => {
  const navigate = useNavigate()

  return (
    <div className='relative flex items-center justify-center min-h-screen text-white'>
      {/* Ảnh nền */}
      <img src={page_not_found} alt='Xe điện' className='absolute inset-0 w-full h-full object-cover' />

      {/* Lớp phủ mờ */}
      <div className='absolute inset-0 bg-black/50' />

      {/* Nội dung chính */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='relative text-center px-6'
      >
        <h1 className='text-7xl md:text-8xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400'>
          404
        </h1>
        <h2 className='text-2xl md:text-3xl font-light tracking-widest uppercase mb-4'>KHÔNG TÌM THẤY TRANG</h2>
        <p className='text-gray-300 mb-8 max-w-md mx-auto font-light italic'>
          Có vẻ trang này không tồn tại hoặc đã bị di chuyển...
        </p>

        <button
          onClick={() => navigate('/')}
          className='inline-flex items-center bg-white/90 text-gray-900 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-xl 
                       hover:bg-white hover:shadow-2xl hover:scale-105'
        >
          Về trang chủ
        </button>
      </motion.div>
    </div>
  )
}

export default PageNotFound
