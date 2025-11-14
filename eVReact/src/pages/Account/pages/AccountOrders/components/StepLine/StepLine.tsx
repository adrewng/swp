import { motion } from 'framer-motion'

export function StepLine({ steps, activeIndex }: { steps: { key: string; title: string }[]; activeIndex: number }) {
  const pct = steps.length > 1 ? (activeIndex / (steps.length - 1)) * 100 : 0
  return (
    <div className='px-1 mt-12'>
      {/* Line */}
      <div className='relative mt-4 h-1.5 w-full rounded-full bg-gray-200'>
        {/* Filled line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          className='absolute left-0 top-0 h-1.5 rounded-full bg-emerald-500'
        />
        {/* Dots */}
        {steps.map((_, i) => {
          const left = steps.length > 1 ? (i / (steps.length - 1)) * 100 : 0
          const active = i <= activeIndex
          return (
            <div key={i} className='absolute -top-1.5' style={{ left: `calc(${left}% - 10px)` }}>
              <div
                className={`h-5 w-5 rounded-full border-2 bg-white ring-2 ${
                  active ? 'border-emerald-500 ring-emerald-100' : 'border-gray-300 ring-gray-100'
                }`}
              />
            </div>
          )
        })}
      </div>
      <div className='relative mt-3 h-8 md:h-10'>
        {steps.map((s, i) => {
          const left = steps.length > 1 ? (i / (steps.length - 1)) * 100 : 0
          const active = i <= activeIndex
          const isOdd = i % 2 === 1
          return (
            <div
              key={s.key}
              className={`absolute ${isOdd ? '-top-15' : 'top-0'} -translate-x-1/2 text-[11px] leading-4 text-center w-24 md:w-28 whitespace-normal ${
                active ? 'text-emerald-700 font-medium' : 'text-gray-500'
              }`}
              style={{ left: `${left}%` }}
            >
              {s.title}
            </div>
          )
        })}
      </div>
    </div>
  )
}
