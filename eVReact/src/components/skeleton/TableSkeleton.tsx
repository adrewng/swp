type Props = {
  rows?: number
  cols?: number
  showHeader?: boolean
}

export default function TableSkeleton({ rows = 5, cols = 5, showHeader = true }: Props) {
  return (
    <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white animate-pulse'>
      <table className='min-w-full'>
        {showHeader && (
          <thead className='bg-gray-50'>
            <tr>
              {Array.from({ length: cols }).map((_, i) => (
                <th key={i} className='px-4 py-3'>
                  <div className='h-4 bg-gray-300 rounded w-24'></div>
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className='divide-y divide-gray-100'>
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr key={rowIdx} className='hover:bg-gray-50'>
              {Array.from({ length: cols }).map((_, colIdx) => (
                <td key={colIdx} className='px-4 py-3'>
                  <div className='h-4 bg-gray-200 rounded w-full max-w-[200px]'></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

