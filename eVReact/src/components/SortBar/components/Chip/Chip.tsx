import classNames from 'classnames'

type Props = {
  text: string
  onRemove?: () => void
  title?: string
  className?: string
  onClick?: () => void
}

export default function Chip({ text, onRemove, title, className, onClick }: Props) {
  const Comp = onClick ? 'button' : 'div'
  return (
    <Comp
      onClick={onClick}
      className={classNames(
        'group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100',
        'px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-200 transition-colors',
        onClick && 'focus:outline-none focus:ring-2 focus:ring-zinc-400',
        className
      )}
      aria-label={title ? `Chip: ${title}` : undefined}
      title={title}
    >
      <span className='truncate max-w-[200px]'>{text}</span>

      {onRemove && (
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className='inline-flex size-4 items-center justify-center rounded-full bg-zinc-200 group-hover:bg-zinc-300 text-zinc-600'
          aria-label='Xoá bộ lọc'
          title='Xoá bộ lọc'
        >
          ×
        </button>
      )}
    </Comp>
  )
}
