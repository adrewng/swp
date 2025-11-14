import * as React from 'react'
import { NavLink } from 'react-router-dom'

type NavPillLinkProps = {
  to: string
  children: React.ReactNode
  className?: string
  pillClassName?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeStyle: Record<NonNullable<NavPillLinkProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-[13px]',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base'
}

export default function NavPillLink({
  to,
  children,
  className = '',
  pillClassName = 'bg-zinc-900',
  size = 'md'
}: NavPillLinkProps) {
  const base =
    `group relative inline-flex items-center rounded-full ${sizeStyle[size]} ` +
    `select-none overflow-hidden ` +
    `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 ` +
    (className ?? '')

  return (
    <NavLink to={to} className={base}>
      {({ isActive }) => (
        <>
          <span
            aria-hidden
            className={[
              'pointer-events-none absolute inset-0 rounded-full',
              pillClassName,
              'transform-gpu will-change-transform transition-transform duration-300 ease-out',
              isActive
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100'
            ].join(' ')}
          />
          <span
            className={[
              'relative z-10 transition-colors duration-300',
              isActive ? 'text-white' : 'text-black text-sm font-semibold group-hover:text-white'
            ].join(' ')}
          >
            {children}
          </span>
        </>
      )}
    </NavLink>
  )
}
