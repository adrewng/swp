import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Nguyễn Minh',
      location: 'Hà Nội',
      content: 'Mình bán xe điện cũ chỉ sau 2 ngày đăng tin, rất tiện! Giao diện dễ dùng và có nhiều người quan tâm.',
      rating: 5
    },
    {
      name: 'Trần Hương',
      location: 'TP. Hồ Chí Minh',
      content: 'Tìm được pin xe điện chất lượng với giá tốt. Người bán rất uy tín, giao dịch nhanh gọn.',
      rating: 5
    },
    {
      name: 'Lê Tuấn',
      location: 'Đà Nẵng',
      content: 'Nền tảng chuyên nghiệp, thông tin minh bạch. Đã mua được xe VinFast với giá hợp lý.',
      rating: 5
    }
  ]

  return (
    <section className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 mb-4'>
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className='text-lg text-neutral-500 max-w-2xl mx-auto'>Hàng nghìn giao dịch thành công mỗi tháng</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className='bg-neutral-50 rounded-2xl border border-neutral-200 p-8 shadow-sm'>
                <div className='flex gap-1 mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className='w-5 h-5 fill-black text-black' />
                  ))}
                </div>
                <p className='text-neutral-600 mb-6 italic'>"{testimonial.content}"</p>
                <div>
                  <p className='font-semibold text-neutral-900'>{testimonial.name}</p>
                  <p className='text-sm text-neutral-500'>{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
