import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Pagination from '~/components/Pagination'
import PostCard from '~/components/PostCard'
import ProductCardSkeletonLight from '~/components/ProductCardSkeleton/ProductCardSkeleton'
import SortBar from '~/components/SortBar'
import { path } from '~/constants/path'
import { useListQueries } from '~/hooks/useListQueries'
import { CategoryType } from '~/types/category.type'
import VehicleFilter from './components/VehicleFilter'

export default function VehicleList() {
  const { postsData, categorySlug, queryConfig } = useListQueries({ categoryType: CategoryType.vehicle })
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true)
  const toggleFilter = () => {
    setIsFilterOpen((s) => !s)
  }

  const pageLoading = postsData?.isLoading
  const pageData = postsData?.data?.data?.data

  return (
    <div className='min-h-screen text-zinc-900'>
      <div className='mb-6'>
        <SortBar
          queryConfig={queryConfig}
          onToggleFilter={toggleFilter}
          isFilterOpen={isFilterOpen}
          pathName={path.vehicle}
        />
      </div>

      <div className='pb-8 md:pb-10'>
        {/* DESKTOP layout (lg+): sidebar animate width, list animate x */}
        <div className='hidden lg:grid lg:grid-cols-[auto_minmax(0,1fr)] gap-8'>
          {/* Sidebar (desktop) - always mounted, width animate 0 <-> 352 */}
          <motion.aside
            aria-hidden={!isFilterOpen}
            animate={{ width: isFilterOpen ? 352 : 0 }}
            initial={false}
            transition={{ duration: isFilterOpen ? 0.34 : 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            className='w-[22rem]'
          >
            {/* Sticky wrapper: dính dưới header/sortbar ~0rem (top-0) */}
            <div className='sticky top-0 self-start overflow-hidden'>
              {/* Nội dung filter dài sẽ tự cuộn trong khung sticky */}
              <div className='max-h-[calc(100vh-6rem)] overflow-y-auto'>
                {/* Khi width=0, chặn tương tác */}
                <div className={classNames('w-[22rem]', !isFilterOpen && 'pointer-events-none')}>
                  <VehicleFilter queryConfig={queryConfig} categorySlug={categorySlug} />
                </div>
              </div>
            </div>
          </motion.aside>

          {/* List (desktop) - trượt theo hướng nhỏ để tạo cảm giác "đi cùng" */}
          <motion.section
            initial={false}
            animate={{
              x: isFilterOpen ? 0 : 12
            }}
            transition={{ duration: isFilterOpen ? 0.34 : 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            className='min-w-0'
          >
            <div
              className={classNames(
                'grid grid-cols-1 sm:grid-cols-2 gap-6 pr-6',
                isFilterOpen
                  ? 'lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
                  : 'lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
              )}
            >
              {pageLoading && !pageData
                ? Array.from({ length: 20 }).map((_, index) => (
                    <motion.div
                      key={`s-${index}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
                      className='group'
                    >
                      <div className='flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white'>
                        <ProductCardSkeletonLight />
                      </div>
                    </motion.div>
                  ))
                : (pageData?.posts ?? []).map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
                      className='group'
                    >
                      <div className='flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow duration-300 hover:shadow-lg'>
                        <PostCard post={post} />
                      </div>
                    </motion.div>
                  ))}
            </div>

            {/* pagination: only render when we have pageData (initial skeleton state hides it) */}
            {pageData && pageData.pagination.page_size > 0 && (
              <motion.div
                key={pageData.pagination.page}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
              >
                <Pagination
                  queryConfig={queryConfig}
                  pageSize={pageData.pagination.page_size}
                  pathName={path.vehicle}
                />
              </motion.div>
            )}
          </motion.section>
        </div>

        {/* MOBILE/TABLET (< lg): overlay drawer từ trái */}
        <div className='lg:hidden'>
          <div className='min-w-0 px-4'>
            <div className='grid grid-cols-1 gap-4 sm:gap-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
                {pageLoading && !pageData
                  ? Array.from({ length: 20 }).map((_, index) => (
                      <motion.div
                        key={`ms-${index}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
                        className='group'
                      >
                        <div className='flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white'>
                          <ProductCardSkeletonLight />
                        </div>
                      </motion.div>
                    ))
                  : (pageData?.posts ?? []).map((post) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
                        className='group'
                      >
                        <div className='flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow duration-300 hover:shadow-lg'>
                          <PostCard post={post} />
                        </div>
                      </motion.div>
                    ))}
              </div>

              {pageData && (
                <motion.div
                  key={pageData.pagination.page}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className='mt-4'
                >
                  <Pagination
                    queryConfig={queryConfig}
                    pageSize={pageData.pagination.page_size}
                    pathName={path.vehicle}
                  />
                </motion.div>
              )}
            </div>
          </div>

          {/* Drawer + Overlay */}
          <AnimatePresence>
            {isFilterOpen && (
              <>
                <motion.div
                  key='overlay'
                  className='fixed inset-0 z-40 bg-black/50 backdrop-blur-sm'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
                  onClick={toggleFilter}
                />
                <motion.aside
                  key='drawer'
                  className='fixed inset-y-0 left-0 z-50 w-[min(90vw,22rem)] shadow-2xl'
                  initial={{ x: -320 }}
                  animate={{ x: 0 }}
                  exit={{ x: -320 }}
                  transition={{ duration: 0.34, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <div className='h-full overflow-y-auto'>
                    <VehicleFilter queryConfig={queryConfig} categorySlug={categorySlug} />
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
