import { motion } from 'framer-motion'
import { Eye, MapPin } from 'lucide-react'

export default function FeaturedListings() {
  const listings = [
    {
      image: '/electric-scooter.png',
      title: 'VinFast Klara S 2022',
      price: '18.500.000đ',
      location: 'Hà Nội',
      views: 234
    },
    {
      image: '/modern-electric-car.jpg',
      title: 'VinFast VF e34 2023',
      price: '550.000.000đ',
      location: 'TP. Hồ Chí Minh',
      views: 567
    },
    {
      image: '/ev-battery-pack.jpg',
      title: 'Pin Lithium 60V 30Ah',
      price: '12.000.000đ',
      location: 'Đà Nẵng',
      views: 189
    },
    {
      image: '/electric-motorcycle.jpg',
      title: 'Yadea S3 Pro 2023',
      price: '22.000.000đ',
      location: 'Hải Phòng',
      views: 345
    },
    {
      image: '/tesla-model-3-sleek-profile.png',
      title: 'Tesla Model 3 2021',
      price: '1.200.000.000đ',
      location: 'Hà Nội',
      views: 892
    },
    {
      image: '/ev-charging-station.jpg',
      title: 'Trạm sạc AC 7kW',
      price: '15.000.000đ',
      location: 'Cần Thơ',
      views: 156
    }
  ]

  return (
    <section id='listings' className='py-20 bg-neutral-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 mb-4'>Tin nổi bật</h2>
          <p className='text-lg text-neutral-500 max-w-2xl mx-auto'>
            Những tin đăng mới nhất và được quan tâm nhiều nhất
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {listings.map((listing, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className='bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300'>
                <div className='relative'>
                  <img
                    src={listing.image || '/placeholder.svg'}
                    alt={listing.title}
                    className='w-full h-56 object-cover'
                  />
                  <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1'>
                    <Eye className='w-3 h-3' />
                    <span className='text-xs font-medium'>{listing.views}</span>
                  </div>
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-semibold text-neutral-900 mb-2'>{listing.title}</h3>
                  <p className='text-2xl font-bold text-black mb-3'>{listing.price}</p>
                  <div className='flex items-center gap-2 text-sm text-neutral-500 mb-4'>
                    <MapPin className='w-4 h-4' />
                    <span>{listing.location}</span>
                  </div>
                  <button className='w-full py-3 bg-neutral-900 text-white rounded-xl text-base font-semibold hover:bg-neutral-800 transition-all duration-300'>
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className='text-center mt-12'>
          <button className='px-8 py-3 bg-white text-neutral-900 border border-neutral-300 rounded-xl text-base font-semibold hover:bg-neutral-50 transition-all duration-300'>
            Xem tất cả tin đăng
          </button>
        </div>
      </div>
    </section>
  )
}
