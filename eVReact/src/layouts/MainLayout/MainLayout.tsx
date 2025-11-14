import { usePrefetchQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import categoryApi from '~/apis/categories.api'
import NavHeader from '~/components/NavHeader'

interface Props {
  children?: React.ReactNode
}
function MainLayoutInner({ children }: Props) {
  usePrefetchQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getCategories,
    staleTime: 3 * 60 * 1000
  })
  return (
    <div>
      <NavHeader />
      {children}
      <Outlet />
    </div>
  )
}
const MainLayout = memo(MainLayoutInner)
export default MainLayout
