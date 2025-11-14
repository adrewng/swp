import type { JSX } from 'react'

export default function SpecRow({ icon, label, value }: { icon: JSX.Element; label: string; value?: string | number }) {
  if (!value && value !== 0) return null
  return (
    <div className='group relative flex items-center gap-3 rounded-xl border border-zinc-200 bg-white/80 px-3 py-2 shadow-sm transition hover:shadow-md'>
      <div className='rounded-lg bg-zinc-50 p-2 text-zinc-700 group-hover:bg-zinc-100'>{icon}</div>
      <div className='min-w-0'>
        <p className='text-xs text-zinc-500'>{label}</p>
        <p className='truncate font-medium text-zinc-900'>{value}</p>
      </div>
      <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent group-hover:ring-zinc-200' />
    </div>
  )
}
