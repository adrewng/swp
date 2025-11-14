export default function TransactionSkeleton() {
  return (
    <div className='flex-1 bg-white min-h-screen animate-pulse'>
      <div className='max-w-7xl mx-auto px-6 py-8 space-y-8'>
        {/* Header */}
        <div className='flex items-start justify-between'>
          <div>
            <div className='h-10 bg-gray-200 rounded w-64 mb-2'></div>
            <div className='h-5 bg-gray-200 rounded w-96'></div>
          </div>
          <div className='h-12 bg-gray-200 rounded-xl w-40'></div>
        </div>

        {/* Quick Stats */}
        <div className='grid grid-cols-3 gap-4'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='bg-gray-200 rounded-2xl p-6'>
              <div className='flex items-start justify-between mb-4'>
                <div className='w-12 h-12 bg-gray-300 rounded-xl'></div>
                <div className='w-5 h-5 bg-gray-300 rounded'></div>
              </div>
              <div className='h-8 bg-gray-300 rounded w-32 mb-1'></div>
              <div className='h-4 bg-gray-300 rounded w-24'></div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className='border-b border-gray-200'>
          <div className='flex gap-8'>
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className='h-6 bg-gray-200 rounded w-32'></div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className='space-y-4'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className='bg-white border border-gray-200 rounded-xl p-5'>
              <div className='flex items-start justify-between'>
                <div className='flex items-start gap-4 flex-1'>
                  <div className='w-12 h-12 bg-gray-200 rounded-xl'></div>
                  <div className='flex-1 space-y-2'>
                    <div className='h-5 bg-gray-200 rounded w-48'></div>
                    <div className='h-4 bg-gray-200 rounded w-64'></div>
                    <div className='h-6 bg-gray-200 rounded w-32'></div>
                  </div>
                </div>
                <div className='h-8 bg-gray-200 rounded w-24'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

