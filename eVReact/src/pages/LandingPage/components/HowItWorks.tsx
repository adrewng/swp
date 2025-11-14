import { motion } from 'framer-motion'
import { FileText, MessageSquare, UserPlus } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Đăng ký tài khoản',
      description: 'Tạo tài khoản miễn phí chỉ trong vài giây'
    },
    {
      icon: FileText,
      title: 'Đăng tin xe hoặc pin',
      description: 'Điền thông tin và đăng tin của bạn'
    },
    {
      icon: MessageSquare,
      title: 'Nhận liên hệ và giao dịch',
      description: 'Kết nối với người mua/bán và hoàn tất giao dịch'
    }
  ]

  return (
    <section className='py-20 bg-neutral-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 mb-4'>Cách hoạt động</h2>
          <p className='text-lg text-neutral-500 max-w-2xl mx-auto'>Chỉ 3 bước đơn giản để bắt đầu</p>
        </div>

        <div className='max-w-5xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-12 relative'>
            {/* Connection line */}
            <div className='hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-neutral-200' />

            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className='relative'
              >
                <div className='flex flex-col items-center text-center'>
                  <div className='w-32 h-32 rounded-full bg-neutral-100 border-4 border-white flex items-center justify-center mb-6 relative z-10'>
                    <step.icon className='w-12 h-12 text-black' />
                  </div>
                  <div className='absolute top-12 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-xl z-20'>
                    {index + 1}
                  </div>
                  <h3 className='text-xl font-semibold text-neutral-900 mb-3'>{step.title}</h3>
                  <p className='text-neutral-600'>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
