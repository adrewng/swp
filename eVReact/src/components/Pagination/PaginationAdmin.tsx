import { createSearchParams, Link } from 'react-router-dom'
import type { QueryConfig } from '~/pages/admin/PostManagement/PostManagement'
// import type { QueryConfig } from '../PostManagement/PostTable'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const RANGE = 2
export default function PaginationAdmin(props: Props) {
  const { queryConfig, pageSize } = props
  const page = Number(queryConfig.page) || 1

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className='px-3 py-1 rounded bg-gray-100 shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='px-3 py-1 rounded bg-gray-100 shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        //dieu kien de render ra dau ...
        //truong hop 1, in cac dau ... o doan sau
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        }
        //truong hop 2, in cac dau ... o truoc va sau
        else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        }
        //truong hop 3 ,in cac dau ... o doan truoc
        else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }

        return (
          <Link
            to={{
              pathname: '',
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={`px-3 py-1 rounded shadow-sm transition-colors ${
              pageNumber === page ? 'bg-black text-white  font-semibold' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='flex justify-center items-center gap-2 py-4'>
      {/* <button className='px-3 py-1 rounded bg-gray-100 shadow-sm'>1</button> */}
      {renderPagination()}
    </div>
  )
}
