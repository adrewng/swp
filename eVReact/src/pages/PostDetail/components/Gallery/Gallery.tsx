import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import LightBox from '../LightBox'

export function Gallery({ images }: { images?: string[] }) {
  // 1) danh sách ảnh (lọc rỗng + khử trùng lặp)
  const list = useMemo(() => Array.from(new Set((images ?? []).filter(Boolean))) as string[], [images])

  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)

  // 2) nếu list đổi và active vượt biên → reset
  useEffect(() => {
    if (active >= list.length) setActive(0)
  }, [list, active])

  // 3) điều hướng ảnh
  const go = useCallback(
    (delta: number) => {
      if (list.length <= 1) return
      setActive((i) => {
        const n = (i + delta) % list.length
        return n < 0 ? n + list.length : n
      })
    },
    [list.length]
  )

  // 4) keyboard support (← →)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [go])

  if (list.length === 0) {
    return <div className='aspect-[16/10] w-full rounded-3xl bg-zinc-100/80' />
  }

  return (
    <div className='space-y-3'>
      <div
        ref={wrapperRef}
        tabIndex={0}
        className='relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-100 to-white outline-none focus:ring-2 focus:ring-zinc-300'
        aria-label='Bộ sưu tập ảnh'
      >
        <AnimatePresence mode='wait'>
          <motion.img
            key={list[active]}
            src={list[active]}
            alt='Ảnh sản phẩm'
            className='aspect-[16/10] w-full object-cover'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut'
            }}
            onClick={() => setOpen(true)}
            loading='eager'
          />
        </AnimatePresence>

        {/* hint trên đầu */}
        <div className='pointer-events-none absolute inset-x-0 top-0 flex justify-between p-3'>
          <span className='rounded-full bg-black/5 px-3 py-1 text-xs text-black/70 backdrop-blur'>
            Click ảnh để phóng to
          </span>
        </div>

        {/* Prev / Next buttons */}
        {list.length > 0 && (
          <>
            {/* Prev (trái) */}
            <button
              type='button'
              onClick={() => go(-1)}
              aria-label='Ảnh trước'
              className='absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-zinc-200 bg-white/80 p-2 shadow-sm backdrop-blur transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300'
            >
              {/* Chevron Left (SVG bạn gửi) */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
              </svg>
            </button>

            {/* Next (phải) */}
            <button
              type='button'
              onClick={() => go(1)}
              aria-label='Ảnh tiếp theo'
              className='absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-zinc-200 bg-white/80 p-2 shadow-sm backdrop-blur transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300'
            >
              {/* Chevron Right (SVG bạn gửi) */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* thumbs */}
      {list.length > 0 && (
        <div className='no-scrollbar -mx-1.5 flex gap-3 overflow-x-auto px-1.5'>
          {list.map((src, i) => (
            <button
              key={`${src}-${i}`}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`relative aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-xl border transition ${
                i === active ? 'border-zinc-900 ring-2 ring-zinc-900/10' : 'border-zinc-200 hover:border-zinc-400'
              }`}
            >
              <img src={src} alt='Ảnh thu nhỏ' className='h-full w-full object-cover' loading='lazy' />
            </button>
          ))}
        </div>
      )}

      {open && <LightBox images={list} index={active} onClose={() => setOpen(false)} />}
    </div>
  )
}
