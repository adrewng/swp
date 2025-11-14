import { useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { createSearchParams, Link, useLocation } from 'react-router-dom'
import { authApi } from '~/apis/auth.api'
import { path } from '~/constants/path'
import { AppContext } from '~/contexts/app.context'
import logoUrl from '~/shared/logo.svg'
import { CategoryType } from '~/types/category.type'
import Popover from '../Popover'

export default function NavHeader() {
  const pathname = useLocation().pathname
  const [query, setQuery] = useState('')
  const { isAuthenticated, profile, setIsAuthenticated } = useContext(AppContext)

  function onSearch() {
    console.log({ query })
  }
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => setIsAuthenticated(false)
  })
  const handleLogout = () => logoutMutation.mutate()

  return (
    <div className='w-full px-5 py-2 border-b border-zinc-200'>
      {/* Header row - logo và buttons */}
      {/* Logo */}
      <div className='flex items-center justify-between w-full cursor-pointer'>
        <div className='flex-shrink-0 justify-self-start w-[120px] h-[60px]'>
          <Link to={path.home} className='inline-flex items-center gap-2'>
            <img
              src={logoUrl}
              alt='EViest'
              className='block select-none object-contain'
              style={{ width: '120px', height: '60px' }}
            />
          </Link>
        </div>

        {/* Search input - hiển thị từ md trở lên */}
        <div className='hidden md:flex justify-center items-center flex-1 ml-5'>
          <div className='w-full max-w-3xl flex justify-center items-center rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>

            <label htmlFor='exact-search-desktop' className='sr-only'>
              Search
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              id='exact-search-desktop'
              placeholder='Eligible for tax credit'
              className='flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none ml-2'
            />
          </div>
        </div>

        {/* Buttons */}
        <div className='justify-self-end flex items-center gap-2 flex-shrink-0'>
          <div>
            <Popover
              className='flex items-center py-1 cursor-pointer'
              renderProp={<div className='flex flex-col py-2 pr-28 pl-3 text-black'>…</div>}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='size-6 hover:fill-black'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0'
                />
              </svg>
            </Popover>
          </div>

          <div>
            <Popover
              className='flex items-center py-1 cursor-pointer'
              renderProp={<div className='flex flex-col py-2 pr-28 pl-3 text-black'>…</div>}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='size-6 hover:fill-black'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                />
              </svg>
            </Popover>
          </div>

          {isAuthenticated && (
            <Link
              to={path.post}
              className='hidden tablet:inline-block px-4 py-2 rounded-full text-sm border border-black text-black font-medium hover:bg-black/10 transition'
            >
              Quản lí tin
            </Link>
          )}

          {pathname === path.home && (
            <Link
              to={path.post}
              className='py-2 w-23 flex justify-center items-center rounded-full text-sm bg-black text-white font-medium hover:bg-black/80 transition cursor-pointer'
            >
              Đăng tin
            </Link>
          )}
          {pathname === path.vehicle && (
            <Link
              to={`${path.post}?${createSearchParams({ category_type: CategoryType.vehicle }).toString()}`}
              className='py-2 w-23 flex justify-center items-center rounded-full text-sm bg-black text-white font-medium hover:bg-black/80 transition cursor-pointer'
            >
              Bán xe
            </Link>
          )}
          {pathname === path.battery && (
            <Link
              to={`${path.post}?${createSearchParams({ category_type: CategoryType.battery }).toString()}`}
              className='py-2 w-23 flex justify-center items-center rounded-full text-sm bg-black text-white font-medium hover:bg-black/80 transition cursor-pointer'
            >
              Bán pin
            </Link>
          )}
          {isAuthenticated ? (
            <Popover
              className='flex items-center py-1 cursor-pointer'
              renderProp={
                <div className='relative rounded-sm border border-gray-200 border-t-0 bg-white shadow-md'>
                  <Link to='/profile' className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-50'>
                    Tài khoản của tôi
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-50'
                  >
                    Đăng xuất
                  </button>
                </div>
              }
            >
              <div className='size-8 rounded-full overflow-hidden ring-1 ring-zinc-200'>
                <img
                  src={profile?.avatar || 'https://picsum.photos/32'}
                  alt='User'
                  className='size-full object-cover'
                />
              </div>
            </Popover>
          ) : (
            <Link
              to={path.login}
              className='py-2 w-27 flex justify-center items-center rounded-full text-sm bg-black text-white font-medium hover:bg-black/80 transition cursor-pointer'
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>

      {/* Search input - hiển thị từ md trở xuống */}
      <div className='md:hidden w-full pb-4'>
        <div className='w-full flex justify-center items-center rounded-full border border-zinc-200 bg-white px-4 py-3 shadow-sm'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
            />
          </svg>
          s
          <label htmlFor='exact-search-mobile' className='sr-only'>
            Search
          </label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            id='exact-search-mobile'
            placeholder='Eligible for tax credit'
            className='flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none'
          />
        </div>
      </div>
    </div>
  )
}
