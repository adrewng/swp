import { motion } from 'framer-motion'
import { Battery, Bike, Car } from 'lucide-react'
import bike from '../../../assets/electricBike.jpg'
import car from '../../../assets/electricCar.jpg'

import battery from '../../../assets/electricBattery3.jpg'

export default function CategoriesSection() {
  const categories = [
    { icon: Bike, title: 'Xe máy điện', image: bike },
    { icon: Car, title: 'Ô tô điện', image: car },
    { icon: Battery, title: 'Pin xe điện', image: battery }
  ]

  return (
    <section className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 mb-4'>
            Khám phá danh mục nổi bật
          </h2>
          <p className='text-lg text-neutral-500 max-w-2xl mx-auto'>
            Tìm kiếm theo danh mục để nhanh chóng tìm được sản phẩm bạn cần
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className='relative overflow-hidden rounded-3xl group h-64'
            >
              {/* Background image */}
              <img
                src={category.image}
                alt={category.title}
                className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
              />

              {/* Overlay gradient */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent'></div>

              {/* Text content */}
              <div className='relative z-10 flex flex-col justify-end h-full p-8 text-white'>
                <h3 className='text-4xl font-bold mb-2'>{category.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
