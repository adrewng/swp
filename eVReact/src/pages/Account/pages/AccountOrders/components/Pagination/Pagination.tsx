import classNames from 'classnames'
import { Link, createSearchParams, useLocation } from 'react-router-dom'
import type { QueryConfig } from '~/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
  pathName?: string // tùy chọn
}

const RANGE = 1

export default function Pagination({ queryConfig, pageSize, pathName }: Props) {
  const page = Number(queryConfig.page) || 1
  const { pathname } = useLocation()

  // ----- Styles gom sẵn để không lệch -----
  const baseBtn =
    'inline-flex items-center justify-center h-9 min-w-[2.25rem] rounded-lg px-3 text-sm font-medium transition-colors'
  const btnActive = 'bg-gray-900 text-white shadow-sm'
  const btnDefault = 'border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 shadow-sm'
  const btnDisabled = 'border bg-white text-gray-400 cursor-not-allowed opacity-60 shadow-sm'
  const dotStyle = 'inline-flex items-center justify-center h-9 min-w-[2.25rem] rounded-lg px-3 text-gray-400'

  const makeTo = (pageNumber: number) => ({
    pathname: pathName ?? pathname,
    search: createSearchParams({ ...queryConfig, page: String(pageNumber) }).toString()
  })

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={`dot-before-${index}`} className={dotStyle} aria-hidden='true'>
            …
          </span>
        )
      }
      return null
    }

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={`dot-after-${index}`} className={dotStyle} aria-hidden='true'>
            …
          </span>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        // Điều kiện tạo "..."
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }

        // Link số trang
        const isActive = pageNumber === page
        return (
          <Link
            to={makeTo(pageNumber)}
            key={pageNumber}
            aria-current={isActive ? 'page' : undefined}
            className={classNames(baseBtn, isActive ? btnActive : btnDefault)}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  const isFirst = page === 1
  const isLast = page === pageSize

  return (
    <nav className='mt-6 flex flex-wrap items-center justify-center gap-2' aria-label='Pagination'>
      {/* Prev */}
      {isFirst ? (
        <span className={classNames(baseBtn, btnDisabled)} aria-disabled='true'>
          Trước
        </span>
      ) : (
        <Link to={makeTo(page - 1)} className={classNames(baseBtn, btnDefault)}>
          Trước
        </Link>
      )}

      {renderPagination()}

      {/* Next */}
      {isLast ? (
        <span className={classNames(baseBtn, btnDisabled)} aria-disabled='true'>
          Sau
        </span>
      ) : (
        <Link to={makeTo(page + 1)} className={classNames(baseBtn, btnDefault)}>
          Sau
        </Link>
      )}
    </nav>
  )
}
