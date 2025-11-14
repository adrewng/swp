import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

export default function Search() {
  const [query, setQuery] = useState('')
  const [sortOpen, setSortOpen] = useState(false)
  const [sort, setSort] = useState('Recommended')

  const options = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Newest']

  function onSearch() {
    // Search functionality
  }

  const panel = {
    hidden: { opacity: 0, y: -8, scale: 0.98 }, // âm để chạy từ trên xuống
    show: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -8, scale: 0.98 }
  }

  return (
    <div className='sticky top-24 w-full mb-8'>
      <div className='flex items-center gap-4 rounded-[28px] border border-zinc-200 bg-white px-3 sm:px-5 py-3 sm:py-4 shadow-[0_1px_2px_rgba(16,24,40,0.06),0_12px_28px_-12px_rgba(16,24,40,0.18)]'>
        {/* Search input */}
        <div className='flex min-w-0 flex-1 items-center rounded-full border border-zinc-200 bg-white px-4 sm:px-5 py-2 sm:py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_2px_rgba(16,24,40,0.06)]'>
          <svg aria-hidden viewBox='0 0 24 24' className='mr-3 h-6 w-6 shrink-0 text-zinc-500'>
            <path
              fill='currentColor'
              d='M12 2.5c.4 0 .7.3.7.7v1.2c0 .4-.3.7-.7.7s-.7-.3-.7-.7V3.2c0-.4.3-.7.7-.7Zm6.1 2.6c.3-.3.7-.3 1 0 .3.3.3.7 0 1l-.8.8c-.3.3-.7.3-1 0s-.3-.7 0-1l.8-.8ZM4.7 5.1c.3-.3.7-.3 1 0l.8.8c.3.3.3.7 0 1s-.7.3-1 0l-.8-.8c-.3-.3-.3-.7 0-1Zm14.9 6.2c0 .4-.3.7-.7.7h-1.2a.7.7 0 1 1 0-1.4H19c.4 0 .7.3.7.7ZM6.3 12a.7.7 0 0 1-.7.7H4.4a.7.7 0 1 1 0-1.4h1.2c.4 0 .7.3.7.7Zm10.5 5.4c.3.3.3.7 0 1l-.8.8c-.3.3-.7.3-1 0s-.3-.7 0-1l.8-.8c.3-.3.7-.3 1 0Zm-9.6.8c.3.3.3.7 0 1-.3.3-.7.3-1 0l-.8-.8c-.3-.3-.3-.7 0-1 .3-.3.7-.3 1 0l.8.8ZM12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z'
            />
          </svg>

          <label htmlFor='exact-search' className='sr-only'>
            Search
          </label>
          <input
            id='exact-search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            placeholder='Eligible for tax credit'
            className='min-w-0 flex-1 bg-transparent text-[18px] sm:text-[20px] leading-7 placeholder-zinc-400 outline-none'
          />
        </div>

        {/* Sort with framer-motion */}
        <div className='relative shrink-0'>
          <button
            onClick={() => setSortOpen((s) => !s)}
            className='inline-flex items-center gap-2 px-1 py-1 text-[18px] sm:text-[20px]'
            aria-haspopup='listbox'
            aria-expanded={sortOpen}
          >
            <span className='font-semibold'>Sort:</span>
            <span>{sort}</span>
            <motion.svg
              viewBox='0 0 24 24'
              className='h-6 w-6'
              animate={{ rotate: sortOpen ? 180 : 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              aria-hidden
            >
              <path fill='currentColor' d='M7 10l5 5 5-5z' />
            </motion.svg>
          </button>

          <AnimatePresence initial={false}>
            {sortOpen && (
              <motion.ul
                role='listbox'
                aria-label='Sort options'
                key='sort-panel'
                variants={panel}
                initial='hidden'
                animate='show'
                exit='exit'
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                className='absolute right-0 z-10 mt-2 w-56 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-1 shadow-lg'
              >
                {options.map((opt) => (
                  <li key={opt}>
                    <button
                      role='option'
                      aria-selected={opt === sort}
                      onClick={() => {
                        setSort(opt)
                        setSortOpen(false)
                      }}
                      className='flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-zinc-100'
                    >
                      <span>{opt}</span>
                      <AnimatePresence initial={false}>
                        {opt === sort && (
                          <motion.svg
                            viewBox='0 0 24 24'
                            className='h-4 w-4'
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.18 }}
                          >
                            <path fill='currentColor' d='M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4z' />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
