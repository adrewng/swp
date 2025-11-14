// ProductCardSkeletonLight.tsx

type Props = { className?: string; imgAspect?: string }

export default function ProductCardSkeletonLight({ className = '', imgAspect = 'aspect-[16/11]' }: Props) {
  return (
    <article
      role='status'
      aria-label='Loading product card'
      className={`w-full max-w-sm bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse ${className}`}
    >
      {/* Image placeholder (top) */}
      <div className={`w-full ${imgAspect} bg-gray-300`}></div>

      {/* Content */}
      <div className='p-4'>
        {/* Title row */}
        <div className='flex items-start justify-between gap-4'>
          <div className='min-w-0'>
            <div className='h-5 bg-gray-400 rounded-md w-3/4 mb-2'></div>
            <div className='h-4 bg-gray-400 rounded-md w-1/2'></div>
          </div>

          {/* heart placeholder */}
          <div className='h-8 w-8 rounded-full bg-gray-400 shrink-0' />
        </div>

        <div className='h-2' />

        {/* Bottom row */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <div className='h-3 w-3 rounded-full bg-gray-400' />
              <div className='h-3 w-10 bg-gray-400 rounded-md' />
            </div>
            <div className='flex items-center gap-2'>
              <div className='h-3 w-3 rounded-full bg-gray-400' />
              <div className='h-3 w-20 bg-gray-400 rounded-md' />
            </div>
          </div>

          <div className='h-6 w-20 bg-gray-400 rounded-md' />
        </div>
      </div>

      <span className='sr-only'>Loading...</span>
    </article>
  )
}
