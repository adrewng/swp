import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  flip,
  offset,
  safePolygon,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  type Placement
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'motion/react'
import { useId, useRef, useState, type ElementType } from 'react'

interface Props {
  children: React.ReactNode
  renderProp: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
  onOpenChange?: (open: boolean) => void
}
export default function Popover({
  children,
  renderProp,
  className,
  as: Element = 'div',
  initialOpen,
  placement = 'bottom-end',
  onOpenChange
}: Props) {
  const [isOpen, setOpen] = useState<boolean>(initialOpen || false)
  const arrowRef = useRef(null)
  const id = useId()
  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    onOpenChange?.(open)
  }
  const data = useFloating({
    open: isOpen,
    onOpenChange: handleOpenChange,
    transform: false,
    middleware: [
      offset(10),
      shift(),
      flip(),
      arrow({
        element: arrowRef
      })
    ],
    placement: placement
  })
  const { refs, floatingStyles, context } = data
  const hover = useHover(context, {
    handleClose: safePolygon({
      buffer: 8 // Tạo vùng đệm 8px để dễ di chuyển chuột từ trigger xuống menu (tăng lên để xử lý gap giữa các element)
    }),
    restMs: 150 // Chờ 150ms trước khi đóng khi chuột rời khỏi vùng an toàn
  })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss])

  return (
    <Element
      className={`group ${className ?? ''}`}
      ref={refs.setReference}
      data-open={isOpen ? '' : undefined}
      aria-haspopup='menu'
      aria-expanded={isOpen}
      {...getReferenceProps()}
    >
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className='relative rounded-sm border border-gray-200 bg-white shadow-md z-50'
              ref={refs.setFloating}
              {...getFloatingProps()}
              style={{ ...floatingStyles, transformOrigin: `${data.middlewareData.arrow?.x}px top` }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              <FloatingArrow
                ref={arrowRef}
                context={context}
                stroke='#e5e7eb'
                strokeWidth={1}
                fill='white'
                width={17}
                height={10}
              />
              {renderProp}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
