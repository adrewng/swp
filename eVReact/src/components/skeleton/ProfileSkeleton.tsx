export default function ProfileSkeleton() {
  return (
    <div className='min-h-screen bg-white flex-1 animate-pulse'>
      <div className='max-w-7xl mx-auto px-6 py-8 space-y-8'>
        {/* Tiêu đề trang */}
        <div>
          <div className='h-10 bg-gray-200 rounded w-64 mb-2'></div>
          <div className='h-5 bg-gray-200 rounded w-96'></div>
        </div>

        {/* Khu vực đầu trang */}
        <div className='flex items-start justify-between'>
          <div className='flex items-start gap-6'>
            {/* Ảnh đại diện */}
            <div className='w-24 h-24 rounded-2xl bg-gray-200'></div>

            {/* Tên & trạng thái */}
            <div>
              <div className='flex items-center gap-3 mb-2'>
                <div className='h-8 bg-gray-200 rounded w-48'></div>
                <div className='h-6 bg-gray-200 rounded-full w-24'></div>
              </div>
              <div className='flex items-center gap-6'>
                <div className='h-4 bg-gray-200 rounded w-32'></div>
                <div className='h-4 bg-gray-200 rounded w-40'></div>
              </div>
            </div>
          </div>
        </div>

        {/* Thống kê */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='bg-gray-50 rounded-2xl p-6 border border-gray-100'>
              <div className='flex items-center justify-between mb-3'>
                <div className='w-5 h-5 bg-gray-200 rounded'></div>
                <div className='w-4 h-4 bg-gray-200 rounded'></div>
              </div>
              <div className='h-4 bg-gray-200 rounded w-32 mb-1'></div>
              <div className='h-8 bg-gray-200 rounded w-16'></div>
            </div>
          ))}
        </div>

        {/* Form Overview */}
        <div className='bg-white border border-gray-200 rounded-2xl p-6 space-y-6'>
          <div className='h-6 bg-gray-200 rounded w-32 mb-4'></div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='space-y-2'>
                <div className='h-4 bg-gray-200 rounded w-24'></div>
                <div className='h-10 bg-gray-100 rounded'></div>
              </div>
            ))}
          </div>
          <div className='space-y-2'>
            <div className='h-4 bg-gray-200 rounded w-32'></div>
            <div className='h-24 bg-gray-100 rounded'></div>
          </div>
          <div className='flex gap-3'>
            <div className='h-10 bg-gray-200 rounded w-24'></div>
            <div className='h-10 bg-gray-200 rounded w-24'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

