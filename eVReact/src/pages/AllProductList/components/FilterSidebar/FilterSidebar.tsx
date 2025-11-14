import { omit } from 'lodash'
import { XCircle } from 'lucide-react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import CollapseItem from '~/components/CollapseItem'
import FilterOptionLink from '~/components/FilterOptionLink'
import { COLOR_OPTIONS, WARRANTY_OPTIONS } from '~/constants/options'
import { path } from '~/constants/path'
import { type QueryConfig } from '~/hooks/useQueryConfig'
import { CategoryType, type CategoryParent } from '~/types/category.type'
import RangeInput from '../RangeInput/RangeInput'

interface FilterSidebarProps {
  queryConfig: QueryConfig
  categories: CategoryParent[]
}
export default function FilterSidebar({ queryConfig, categories }: FilterSidebarProps) {
  const navigate = useNavigate()
  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(queryConfig, ['price_min', 'price_max', 'warranty', 'color', 'year_min', 'year_max', 'title'])
      ).toString()
    })
  }
  return (
    <div className='rounded-[22px] border border-zinc-200 bg-white shadow-sm p-6 pr-3 max-h-full overflow-y-auto [scrollbar-gutter:stable]'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        {/* Trái: icon + tiêu đề */}
        <div className='flex items-center gap-3 min-w-0'>
          <svg width='1em' height='1.5em' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M13.8457 16L13.9482 16.0049C14.4526 16.056 14.8457 16.4822 14.8457 17C14.8457 17.5178 14.4526 17.944 13.9482 17.9951L13.8457 18H10.1543C9.60201 18 9.1543 17.5523 9.1543 17C9.1543 16.4477 9.60201 16 10.1543 16H13.8457ZM17.5381 11L17.6406 11.0049C18.1449 11.056 18.5381 11.4822 18.5381 12C18.5381 12.5178 18.1449 12.944 17.6406 12.9951L17.5381 13H6.46191C5.90963 13 5.46191 12.5523 5.46191 12C5.46191 11.4477 5.90963 11 6.46191 11H17.5381ZM20 6C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7C3 6.44772 3.44772 6 4 6H20Z'
              fill='currentColor'
            />
          </svg>
          <span className='text-xl font-bold'>Bộ lọc tìm kiếm</span>
        </div>

        {/* Phải: nút Xóa tất cả */}
        <button
          type='button'
          onClick={handleRemoveAll}
          className='inline-flex items-center gap-2 rounded-full border border-zinc-300 px-3 py-1.5
                   text-zinc-800 hover:bg-zinc-100 active:bg-zinc-200 transition-colors'
          aria-label='Xóa tất cả bộ lọc'
        >
          <XCircle className='h-4 w-4' />
          Xóa tất cả
        </button>
      </div>

      <div className='mt-2 text-zinc-600 leading-relaxed'>
        Dùng bộ lọc để thu hẹp kết quả và dễ dàng tìm sản phẩm bạn cần.
      </div>
      {/* Divider */}
      <div className='my-6 h-px bg-zinc-100' />

      {/* Rows */}
      <div className='space-y-6'>
        {/* Sản phẩm cần là gì */}
        <CollapseItem
          renderProp={categories.map((item) => {
            return (
              <FilterOptionLink
                key={item.slug}
                queryConfig={queryConfig}
                pathName={item.slug === CategoryType.vehicle ? path.vehicle : path.battery}
                param='category_type'
                value={item.slug}
                label={item.type === CategoryType.vehicle ? 'Xe' : 'Pin'} // chữ hiển thị bên trái
                rightBadge={item.count ?? 0} // số bên phải (component sẽ tự bọc badge)
                hide={true}
              />
            )
          })}
        >
          <div className='text-lg font-semibold'>Bạn đang cần sản phẩm nào</div>
        </CollapseItem>

        {/* Divider */}
        <div className='h-px bg-zinc-100' />

        {/* Color */}
        <CollapseItem
          renderProp={COLOR_OPTIONS.map((item) => {
            return (
              <FilterOptionLink
                key={item.label}
                queryConfig={queryConfig}
                pathName={path.home}
                param='color'
                value={item.value}
                label={item.label} // chữ hiển thị bên trái
                rightBadge={-1} // số bên phải (component sẽ tự bọc badge)
              />
            )
          })}
        >
          <div className='text-lg font-semibold'>Màu sắc</div>
        </CollapseItem>
        {/* Divider */}
        <div className='h-px bg-zinc-100' />

        {/* Price */}
        <CollapseItem initialOpen renderProp={<RangeInput pathname={path.home} queryConfig={queryConfig} />}>
          <div className='text-lg font-semibold'>Giá</div>
        </CollapseItem>

        {/* Divider */}
        <div className='h-px bg-zinc-100' />

        {/* Bảo hành*/}
        <CollapseItem
          renderProp={WARRANTY_OPTIONS.map((item) => {
            return (
              <FilterOptionLink
                key={item.label}
                queryConfig={queryConfig}
                pathName={path.home}
                param='warranty'
                value={item.value}
                label={item.label} // chữ hiển thị bên trái
                rightBadge={-1} // số bên phải (component sẽ tự bọc badge)
              />
            )
          })}
        >
          <div className='text-lg font-semibold'>
            <div className='text-lg font-semibold'>Tình trạng bảo hành</div>
          </div>
        </CollapseItem>
        {/* Divider */}
        <div className='h-px bg-zinc-100' />
      </div>
    </div>
  )
}
