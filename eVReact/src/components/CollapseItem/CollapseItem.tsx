import { AnimatePresence, motion } from 'framer-motion'
import { useState, type ElementType, type KeyboardEvent } from 'react'

interface Props {
  children: React.ReactNode
  renderProp: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  durationMs?: number // tuỳ chỉnh tốc độ
}

export default function CollapseItem({
  children,
  renderProp,
  className = 'flex items-center justify-between cursor-pointer w-full select-none',
  as: Element = 'div',
  initialOpen,
  durationMs = 260
}: Props) {
  const [open, setOpen] = useState<boolean>(initialOpen ?? false)

  const toggle = () => setOpen((prev) => !prev)

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }

  return (
    <Element>
      {/* Header */}
      <div role='button' tabIndex={0} onClick={toggle} onKeyDown={onKey} className={className}>
        {children}

        {/* Icon */}
        <motion.svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: durationMs / 1000, ease: [0.4, 0, 0.2, 1] }}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
        </motion.svg>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key='content'
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: durationMs / 1000, ease: [0.4, 0, 0.2, 1] }}
            className='overflow-hidden'
          >
            <div className='mt-2 text-sm text-gray-600'>{renderProp}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </Element>
  )
}
