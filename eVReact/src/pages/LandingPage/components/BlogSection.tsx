import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'

export default function BlogSection() {
  const posts = [
    {
      image: '/electric-vehicle-buying-guide.jpg',
      title: 'Kinh nghiệm chọn xe điện cũ',
      excerpt: 'Những điều cần lưu ý khi mua xe điện qua sử dụng để đảm bảo chất lượng và giá trị đầu tư.',
      date: '15 Tháng 1, 2025'
    },
    {
      image: '/ev-battery-maintenance.jpg',
      title: 'Bảo dưỡng pin để dùng lâu hơn',
      excerpt: 'Hướng dẫn chi tiết cách bảo dưỡng và kéo dài tuổi thọ pin xe điện hiệu quả.',
      date: '12 Tháng 1, 2025'
    },
    {
      image: '/vietnam-ev-market.jpg',
      title: 'Thị trường EV tại Việt Nam',
      excerpt: 'Phân tích xu hướng và triển vọng phát triển của thị trường xe điện Việt Nam năm 2025.',
      date: '10 Tháng 1, 2025'
    }
  ]

  return (
    <section className='py-20 bg-neutral-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 mb-4'>
            Tin tức & Hướng dẫn
          </h2>
          <p className='text-lg text-neutral-500 max-w-2xl mx-auto'>
            Cập nhật kiến thức và xu hướng mới nhất về xe điện
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className='bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer'>
                <img src={post.image || '/placeholder.svg'} alt={post.title} className='w-full h-56 object-cover' />
                <div className='p-6'>
                  <div className='flex items-center gap-2 text-sm text-neutral-500 mb-3'>
                    <Calendar className='w-4 h-4' />
                    <span>{post.date}</span>
                  </div>
                  <h3 className='text-xl font-semibold text-neutral-900 mb-3'>{post.title}</h3>
                  <p className='text-neutral-600 mb-4'>{post.excerpt}</p>
                  <div className='flex items-center gap-2 text-black font-medium'>
                    <span>Đọc thêm</span>
                    <ArrowRight className='w-4 h-4' />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
