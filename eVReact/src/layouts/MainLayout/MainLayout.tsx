import { usePrefetchQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import categoryApi from '~/apis/categories.api'
import ChatDock from '~/components/ChatDock'
import Footer from '~/components/Footer'
import NavHeader from '~/components/NavHeader'
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop'

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
      <ScrollToTop />
      <NavHeader />
      {children}
      <Outlet />
      <Footer />
      <ChatDock />
    </div>
  )
}
const MainLayout = memo(MainLayoutInner)
export default MainLayout
