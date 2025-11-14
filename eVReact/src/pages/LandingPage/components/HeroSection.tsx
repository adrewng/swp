import { motion } from 'framer-motion'
import heroBg from '../../../assets/hero5.jpg'

export default function HeroSection() {
  return (
    <section className='relative min-h-screen w-full overflow-hidden bg-black text-white font-inter'>
      {/* Background image */}
      <div className='absolute inset-0'>
        <img src={heroBg} alt='Xe điện' className='w-full h-full object-cover ' />
        {/* Optional overlay gradient */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black/80' />
      </div>

      {/* Content container */}
      <div className='relative z-10 min-h-screen flex flex-col justify-between px-10 sm:px-16 lg:px-24 py-12'>
        {/* Top-left heading */}
        <motion.h1
          initial={{ opacity: 0, x: -60, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className='text-left text-5xl  font-extrabold leading-tight  max-w-2xl drop-shadow-lg pt-25'
        >
          Nền tảng giao dịch <br />
          xe điện & pin cũ <br />
          đáng tin cậy nhất Việt Nam
        </motion.h1>

        {/* Bottom-right tagline */}
        <motion.p
          initial={{ opacity: 0, x: 60, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className='text-right text-base sm:text-lg lg:text-xl max-w-md ml-auto drop-shadow-md'
        >
          Kết nối người mua và người bán xe điện & pin qua sử dụng — <br />
          nhanh chóng, minh bạch và tiện lợi.
        </motion.p>
      </div>
    </section>
  )
}
