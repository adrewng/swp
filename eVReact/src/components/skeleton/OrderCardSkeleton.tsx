export default function OrderCardSkeleton() {
  return (
    <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm animate-pulse'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex-1 space-y-3'>
          <div className='h-5 bg-gray-200 rounded w-1/3'></div>
          <div className='h-4 bg-gray-200 rounded w-1/2'></div>
          <div className='flex items-center gap-4'>
            <div className='h-4 bg-gray-200 rounded w-24'></div>
            <div className='h-4 bg-gray-200 rounded w-32'></div>
          </div>
        </div>
        <div className='h-8 w-20 bg-gray-200 rounded'></div>
      </div>
      <div className='mt-4 pt-4 border-t border-gray-100'>
        <div className='flex items-center justify-between'>
          <div className='h-4 bg-gray-200 rounded w-32'></div>
          <div className='h-6 bg-gray-200 rounded w-24'></div>
        </div>
      </div>
    </div>
  )
}

