import { Link } from 'react-router-dom'
import { path } from '~/constants/path'
import logoUrl from '~/shared/logo.svg'
import NavPillLink from '../NavPillLink'

export default function AuthHeader() {
  return (
    <div className='grid grid-cols-3 items-center px-4 md:px-8 h-16'>
      <div className='flex-shrink-0 justify-self-start w-[120px] h-[60px]'>
        <Link to={path.landingPage} className='inline-flex items-center gap-2'>
          <img
            src={logoUrl}
            alt='EViest'
            className='block select-none object-contain'
            style={{ width: '120px', height: '60px' }}
          />
        </Link>
      </div>

      {/* Navigation giữa màn hình */}
      <div className='hidden md:flex justify-center gap-6 text-sm md:text-base font-medium'>
        <NavPillLink to={path.home}>Trang chủ</NavPillLink>
        <NavPillLink to={path.vehicle}>Xe</NavPillLink>
        <NavPillLink to={path.battery}>Pin</NavPillLink>
      </div>

      {/* Actions bên phải */}
      <div className='flex justify-end items-center gap-4 text-sm md:text-base'>
        {/* Chỗ này thêm nút, avatar, icon... */}
      </div>
    </div>
  )
}
