export default function PostCardSkeleton() {
  return (
    <div className='bg-white border border-gray-200 rounded-2xl overflow-hidden animate-pulse'>
      <div className='flex gap-4 p-5'>
        {/* Thumbnail */}
        <div className='relative w-56 h-40 flex-shrink-0 rounded-xl bg-gray-200'></div>

        {/* Content */}
        <div className='flex-1 flex flex-col justify-between'>
          <div>
            <div className='flex items-start justify-between mb-2'>
              <div className='flex-1'>
                {/* Title */}
                <div className='h-6 bg-gray-200 rounded w-3/4 mb-3'></div>
                {/* ID, Category, Address */}
                <div className='flex items-center gap-3 mb-4'>
                  <div className='h-4 bg-gray-200 rounded w-20'></div>
                  <div className='h-4 bg-gray-200 rounded w-24'></div>
                  <div className='h-4 bg-gray-200 rounded w-32'></div>
                </div>
              </div>
              <div className='w-8 h-8 bg-gray-200 rounded-xl'></div>
            </div>

            {/* Price & Details */}
            <div className='flex items-center gap-6 mt-4'>
              <div className='h-6 bg-gray-200 rounded w-32'></div>
              <div className='h-4 bg-gray-200 rounded w-24'></div>
              <div className='h-4 bg-gray-200 rounded w-28'></div>
            </div>
          </div>

          {/* Footer */}
          <div className='flex items-center justify-between mt-4 pt-4 border-t border-gray-100'>
            <div className='h-4 bg-gray-200 rounded w-32'></div>
            <div className='flex items-center gap-2'>
              <div className='h-9 bg-gray-200 rounded-xl w-20'></div>
              <div className='h-9 bg-gray-200 rounded-xl w-24'></div>
              <div className='h-9 bg-gray-200 rounded-xl w-20'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

