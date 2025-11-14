import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { path } from '~/constants/path'

export default function FinalCTA() {
  return (
    <section className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='max-w-4xl mx-auto text-center bg-neutral-900 rounded-3xl p-12 sm:p-16'
        >
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-8'>
            <Zap className='w-4 h-4 text-white' />
            <span className='text-sm font-medium text-white'>Bắt đầu ngay hôm nay</span>
          </div>

          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6'>
            Sẵn sàng bán xe hoặc pin của bạn ngay hôm nay?
          </h2>

          <p className='text-lg text-neutral-300 mb-10 max-w-2xl mx-auto'>
            Hàng nghìn người mua đang chờ đợi. Đăng tin miễn phí và kết nối ngay!
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <Link to={path.home}>
              <button className='px-8 py-4 bg-transparent text-white border border-white/30 rounded-xl text-base font-semibold hover:bg-white/10 transition-all duration-300'>
                Tìm hiểu thêm
              </button>
            </Link>
            <Link to={path.post}>
              <button className='px-8 py-4 bg-white text-black rounded-xl text-base font-semibold hover:bg-neutral-100 transition-all duration-300 flex items-center gap-2'>
                <Zap className='w-5 h-5' />
                Đăng tin ngay
                <ArrowRight className='w-5 h-5' />
              </button>
            </Link>
          </div>

          <p className='text-sm text-neutral-400 mt-8'>
            Miễn phí đăng ký • Không cần thẻ tín dụng • Hủy bất cứ lúc nào
          </p>
        </motion.div>
      </div>
    </section>
  )
}
