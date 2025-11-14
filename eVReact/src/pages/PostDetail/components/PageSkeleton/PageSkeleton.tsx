export default function PageSkeleton() {
  return (
    <div className='mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10'>
      <div className='mb-5 rounded-2xl border border-zinc-100 bg-white/80 p-4 shadow-sm'>
        <div className='h-6 w-2/3 animate-pulse rounded bg-zinc-200' />
      </div>
      <div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_25rem]'>
        <div className='space-y-6'>
          <div className='aspect-[4/3] w-full animate-pulse rounded-2xl bg-zinc-200' />
          <div className='rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm'>
            <div className='mb-3 h-5 w-40 animate-pulse rounded bg-zinc-200' />
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className='h-10 animate-pulse rounded bg-zinc-100' />
              ))}
            </div>
          </div>
          <div className='rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm'>
            <div className='mb-3 h-5 w-40 animate-pulse rounded bg-zinc-200' />
            <div className='space-y-2'>
              <div className='h-4 w-full animate-pulse rounded bg-zinc-100' />
              <div className='h-4 w-5/6 animate-pulse rounded bg-zinc-100' />
              <div className='h-4 w-2/3 animate-pulse rounded bg-zinc-100' />
            </div>
          </div>
        </div>
        <aside className='space-y-4'>
          <div className='h-52 animate-pulse rounded-2xl bg-zinc-100' />
          <div className='h-40 animate-pulse rounded-2xl bg-zinc-100' />
          <div className='h-40 animate-pulse rounded-2xl bg-zinc-100' />
        </aside>
      </div>
    </div>
  )
}
