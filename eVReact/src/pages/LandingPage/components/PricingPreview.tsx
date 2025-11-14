// import { motion } from 'framer-motion'
// import { Check } from 'lucide-react'
import VehiclePackage from '~/pages/PricingPage/components/VehiclePackage'

export default function PricingPreview() {
  return (
    <section id='pricing' className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 mb-4'>Chọn gói đăng tin</h2>
          <p className='text-lg text-neutral-500 max-w-2xl mx-auto'>Linh hoạt theo nhu cầu của bạn</p>
        </div>
        <VehiclePackage />
      </div>
    </section>
  )
}
