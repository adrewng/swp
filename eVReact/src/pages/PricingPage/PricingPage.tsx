import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import BatteryPackage from './components/BatteryPackage'
import VehiclePackage from './components/VehiclePackage'

interface Question {
  question: string
  answer: string
}

const popularQuestions: Question[] = [
  {
    question: 'Tôi có thể nâng cấp gói sau này không?',
    answer: 'Có, bạn có thể nâng cấp hoặc hạ cấp gói bất kỳ lúc nào trong phần cài đặt tài khoản.'
  },
  {
    question: 'Có hoàn tiền nếu tôi huỷ gói không?',
    answer: 'Chúng tôi hỗ trợ hoàn tiền trong vòng 7 ngày nếu bạn không hài lòng với gói dịch vụ.'
  },
  {
    question: 'Phương thức thanh toán nào được chấp nhận?',
    answer: 'Chúng tôi chấp nhận thẻ ngân hàng, ví điện tử và chuyển khoản.'
  },
  {
    question: 'Tôi có thể chia sẻ gói với người khác không?',
    answer: 'Mỗi tài khoản chỉ áp dụng cho một người dùng, trừ gói Enterprise có hỗ trợ tài khoản con.'
  },
  {
    question: 'Có tự động gia hạn không?',
    answer: 'Không. Bạn sẽ được thông báo trước khi hết hạn để gia hạn thủ công.'
  }
]

export default function PricingPage() {
  const [type, setType] = useState<'vehicle' | 'battery'>('vehicle')
  // const { data: packageData } = useQuery({
  //   queryKey: ['package'],
  //   queryFn: packageApi.getPackage
  // })

  return (
    <div className='min-h-screen bg-white text-neutral-900 font-inter'>
      <main className='max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8'>
        {/* ===== HEADER ===== */}
        <section className='text-center mb-20'>
          <h1 className='text-5xl font-semibold tracking-tight text-neutral-900'>
            Đơn giản, Minh bạch <span className='text-black'>Gói giá</span>
          </h1>
          <p className='mt-4 text-lg text-neutral-500 max-w-2xl mx-auto'>
            Chọn gói đăng tin phù hợp để lan tỏa thông tin xe điện và pin của bạn một cách hiệu quả nhất.
          </p>
        </section>
        {/* ===== BILLING TOGGLE ===== */}
        <div className='flex justify-center mb-12'>
          <div className='flex items-center bg-neutral-100 rounded-full p-1 shadow-inner'>
            <button
              onClick={() => setType('vehicle')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                type === 'vehicle' ? 'bg-black text-white shadow-sm' : 'text-neutral-600 hover:text-black'
              }`}
            >
              Xe
            </button>
            <button
              onClick={() => setType('battery')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                type === 'battery' ? 'bg-black text-white shadow-sm' : 'text-neutral-600 hover:text-black'
              }`}
            >
              Pin
            </button>
          </div>
        </div>
        {/* ===== PACKAGE CARDS ===== */}

        {type === 'vehicle' ? <VehiclePackage /> : <BatteryPackage />}

        {/* ===== FAQ SECTION ===== */}
        <section className='max-w-3xl mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-10'>Câu hỏi thường gặp</h2>
          <div className='space-y-4'>
            {popularQuestions.map((q, i) => (
              <Disclosure key={i} as='div' className='border border-neutral-200 rounded-xl bg-neutral-50 p-5'>
                {({ open }) => (
                  <>
                    <Disclosure.Button className='flex w-full justify-between items-center text-left font-medium text-neutral-800 hover:text-black'>
                      <span>{q.question}</span>
                      <ChevronUpIcon
                        className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-neutral-400 transition-transform`}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter='transition duration-100 ease-out'
                      enterFrom='transform scale-95 opacity-0'
                      enterTo='transform scale-100 opacity-100'
                      leave='transition duration-75 ease-out'
                      leaveFrom='transform scale-100 opacity-100'
                      leaveTo='transform scale-95 opacity-0'
                    >
                      <Disclosure.Panel className='mt-3 text-neutral-600 text-sm'>{q.answer}</Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
