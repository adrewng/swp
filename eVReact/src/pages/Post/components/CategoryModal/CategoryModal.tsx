import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { path } from '~/constants/path'
import type { CategoryChild, CategoryDetail } from '~/types/category.type'

interface CategoryModalProps {
  showCategoryModal: boolean
  onCategorySelect: (category: CategoryChild) => void
  selectedCategory: CategoryChild | null
  onCloseModal: () => void
  typeSlug?: string // Optional: filter by specific type (vehicle/battery)
  categoriesData: CategoryDetail[]
  isLoading: boolean
}

export default function CategoryModal({
  showCategoryModal,
  onCategorySelect,
  selectedCategory,
  onCloseModal,
  categoriesData,
  isLoading,
  typeSlug
}: CategoryModalProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const navigate = useNavigate()

  // Filter categories based on typeSlug
  const filteredCategories =
    categoriesData.filter((category) => {
      if (!typeSlug) return true // Show all if no typeSlug
      return category.slug === typeSlug // Show only specific type
    }) || []

  const handleTypeClick = (type: CategoryDetail) => {
    setExpandedCategory(expandedCategory === type.slug ? null : type.slug)
  }
  const handleClose = () => {
    if (selectedCategory) {
      onCloseModal()
    } else {
      navigate(path.home)
    }
  }

  return createPortal(
    <AnimatePresence>
      {showCategoryModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4'
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl border border-zinc-200'
          >
            <div className='relative p-6 border-b border-zinc-200'>
              <motion.h2
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className='text-2xl font-bold text-center text-zinc-900'
              >
                CHỌN DANH MỤC
              </motion.h2>

              <motion.button
                type='button'
                onClick={handleClose}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.2 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                aria-label='Đóng'
                title='Đóng'
                className='absolute right-6 top-1/2 -translate-y-1/2
               inline-flex h-9 w-9 items-center justify-center cursor-pointer
               rounded-lg border border-zinc-200 bg-white text-zinc-600
               hover:bg-zinc-100 hover:text-zinc-900
               focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400'
              >
                <span className='text-xl leading-none'>×</span>
              </motion.button>
            </div>

            <div className='p-6 max-h-96 overflow-y-auto'>
              <div className='space-y-2'>
                {isLoading ? (
                  // Loading skeleton
                  <div className='space-y-2'>
                    {Array.from({ length: 2 }).map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className='p-4 rounded-lg border border-zinc-200'
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center space-x-3'>
                            <div className='w-8 h-8 bg-zinc-200 rounded animate-pulse'></div>
                            <div className='h-5 w-20 bg-zinc-200 rounded animate-pulse'></div>
                            <div className='h-4 w-8 bg-zinc-200 rounded animate-pulse'></div>
                          </div>
                          <div className='w-5 h-5 bg-zinc-200 rounded animate-pulse'></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  filteredCategories?.map((type, index) => (
                    <motion.div
                      key={type.slug}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      {/* Type Category */}
                      <motion.button
                        whileHover={{ scale: 1.01, backgroundColor: 'rgb(248 250 252)' }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleTypeClick(type)}
                        className='w-full flex items-center justify-between p-4 rounded-lg transition-colors border border-transparent hover:border-zinc-200'
                      >
                        <div className='flex items-center space-x-3'>
                          <span className='text-2xl'>{type.slug === 'vehicle' ? '🚗' : '🔋'}</span>
                          <span className='font-medium text-zinc-900'>{type.type}</span>
                          {type.count && <span className='text-sm text-zinc-500'>({type.count})</span>}
                        </div>
                        {type.childrens && type.childrens.length > 0 && (
                          <motion.svg
                            animate={{ rotate: expandedCategory === type.slug ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                            className='w-5 h-5 text-zinc-400'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                          </motion.svg>
                        )}
                      </motion.button>

                      {/* categories */}
                      <AnimatePresence>
                        {expandedCategory === type.slug && type.childrens && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className='ml-6 overflow-hidden'
                          >
                            <div className='mt-2 space-y-1'>
                              {type.childrens.map((category, subIndex) => (
                                <motion.button
                                  key={category.id}
                                  initial={{ x: -10, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: subIndex * 0.05, duration: 0.2 }}
                                  whileHover={{ scale: 1.01, backgroundColor: 'rgb(248 250 252)' }}
                                  whileTap={{ scale: 0.99 }}
                                  onClick={() => onCategorySelect(category)}
                                  className='w-full flex items-center justify-between p-3 rounded-lg transition-colors border border-transparent hover:border-zinc-200'
                                >
                                  <div className='flex items-center space-x-3'>
                                    <span className='text-xl'>•</span>
                                    <span className='font-medium text-zinc-700'>{category.name}</span>

                                    <span className='text-sm text-zinc-500'>({category.count})</span>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
