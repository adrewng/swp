import { motion } from 'framer-motion'
import { MessageCircle, Search, Shield, Zap } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Giao diện dễ dùng',
      description: 'Đăng tin nhanh chóng, chỉ vài bước đơn giản'
    },
    {
      icon: Shield,
      title: 'An toàn & tin cậy',
      description: 'Mỗi người bán đều được xác thực thông tin'
    },
    {
      icon: Search,
      title: 'Tìm kiếm thông minh',
      description: 'Lọc nhanh theo hãng, dung lượng pin, giá cả'
    },
    {
      icon: MessageCircle,
      title: 'Kết nối nhanh',
      description: 'Nhắn tin, gọi điện trực tiếp với người bán'
    }
  ]

  return (
    <section id='features' className='py-20 bg-neutral-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 mb-4'>
            Tại sao người dùng tin chọn EViest?
          </h2>
          <p className='text-lg text-neutral-500 max-w-2xl mx-auto'>
            Mỗi hành trình với EViest là một câu chuyện về niềm tin, công nghệ và khát vọng thay đổi tương lai xanh.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className='bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300'>
                <div className='w-14 h-14 rounded-xl bg-neutral-100 flex items-center justify-center mb-6'>
                  <feature.icon className='w-7 h-7 text-black' />
                </div>
                <h3 className='text-xl font-semibold text-neutral-900 mb-3'>{feature.title}</h3>
                <p className='text-neutral-600'>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
