import SidebarAccount from '../components/SidebarAccount'
import { Outlet } from 'react-router-dom'
import NavHeader from '~/components/NavHeader'

export default function Account() {
  return (
    <div className='min-h-screen flex flex-col'>
      <NavHeader />
      {/* Main content */}
      <div className='flex flex-1'>
        {/* {Sidebar} */}
        <div className='w-64 flex-shrink-0'>
          <div className='sticky top-0 h-screen overflow-y-auto'>
            <SidebarAccount />
          </div>
        </div>
        {/* {Content} */}
        <div className='flex flex-1 overflow-y-auto'>
          <Outlet />
        </div>
      </div>
      {/* Footer */}
    </div>
  )
}
