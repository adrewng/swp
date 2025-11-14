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
}
export default function Popover({
  children,
  renderProp,
  className,
  as: Element = 'div',
  initialOpen,
  placement = 'bottom-end'
}: Props) {
  const [isOpen, setOpen] = useState<boolean>(initialOpen || false)
  const arrowRef = useRef(null)
  const id = useId()
  const data = useFloating({
    open: isOpen,
    onOpenChange: setOpen,
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
  const hover = useHover(context, { handleClose: safePolygon() })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss])

  return (
    <Element className={className} ref={refs.setReference} {...getReferenceProps}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className='relative rounded-sm border border-gray-200 bg-white shadow-md'
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
