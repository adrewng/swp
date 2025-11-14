import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'

export default function LightBox({ images, index, onClose }: { images: string[]; index: number; onClose: () => void }) {
  const [i, setI] = useState(index)
  const next = () => setI((v) => (v + 1) % images.length)
  const prev = () => setI((v) => (v - 1 + images.length) % images.length)
  return (
    <AnimatePresence>
      <motion.div
        className='fixed inset-0 z-[60] flex items-center justify-center bg-black/80'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          className='absolute right-4 top-4 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20'
          onClick={onClose}
        >
          <X className='h-6 w-6' />
        </button>
        <div className='mx-auto w-full max-w-5xl px-4'>
          <div className='relative overflow-hidden rounded-2xl'>
            <img src={images[i]} alt='preview' className='max-h-[80vh] w-full object-contain' />
            <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
          </div>
          <div className='mt-3 flex items-center justify-between gap-3'>
            <button onClick={prev} className='rounded-xl bg-white/10 px-3 py-2 text-white hover:bg-white/20'>
              Trước
            </button>
            <div className='no-scrollbar flex gap-2 overflow-x-auto'>
              {images.map((src, idx) => (
                <button
                  key={src + idx}
                  onClick={() => setI(idx)}
                  className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border ${idx === i ? 'border-white' : 'border-white/30'}`}
                >
                  <img src={src} alt='thumb' className='h-full w-full object-cover' />
                </button>
              ))}
            </div>
            <button onClick={next} className='rounded-xl bg-white/10 px-3 py-2 text-white hover:bg-white/20'>
              Tiếp
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
