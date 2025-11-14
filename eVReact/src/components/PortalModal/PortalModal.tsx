import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function PortalModal({
  open,
  onClose,
  children,
  titleId
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  titleId?: string
}) {
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const container = document.body

  useEffect(() => {
    if (!open) return
    // ESC to close
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    // scroll lock
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose()
  }

  return createPortal(
    <div
      ref={overlayRef}
      onMouseDown={handleOverlayClick}
      className='fixed inset-0 z-[1000] bg-black/40 flex items-center justify-center p-4'
      aria-hidden={false}
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        className='w-full max-w-lg rounded-2xl bg-white shadow-xl'
      >
        {children}
      </div>
    </div>,
    container
  )
}
