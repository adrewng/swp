import { SESSION_STATUS_CLASS, SESSION_STATUS_LABEL } from '~/constants/auction'
import type { SessionStatus } from '~/types/auction.type'

export function StatusPill({ status }: { status: SessionStatus }) {
  return (
    <span className={`rounded-lg px-2 py-0.5 text-xs font-medium ring-1 ${SESSION_STATUS_CLASS[status]}`}>
      {SESSION_STATUS_LABEL[status]}
    </span>
  )
}
