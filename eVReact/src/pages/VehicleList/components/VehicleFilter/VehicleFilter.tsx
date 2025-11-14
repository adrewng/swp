import { useQuery } from '@tanstack/react-query'
import categoryApi from '~/apis/categories.api'
import CollapseItem from '~/components/CollapseItem'
import FilterOptionLink from '~/components/FilterOptionLink'
import { path } from '~/constants/path'
import { type QueryConfig } from '~/hooks/useQueryConfig'
import { CategoryType } from '~/types/category.type'

interface VehicleFilterProps {
  queryConfig: QueryConfig
  categorySlug: CategoryType
}
export default function VehicleFilter({ queryConfig, categorySlug }: VehicleFilterProps) {
  const { data: categoryData } = useQuery({
    queryKey: ['category', categorySlug],
    queryFn: () => categoryApi.getCategoryBySlug(categorySlug),
    staleTime: 3 * 60 * 1000,
    enabled: categorySlug !== CategoryType.notFound
  })

  return (
    <div className='rounded-[22px] border border-zinc-200 bg-white shadow-sm p-6'>
      {/* Header */}
      <div className='flex items-center gap-3'>
        <svg width='1em' height='1.5em' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M13.8457 16L13.9482 16.0049C14.4526 16.056 14.8457 16.4822 14.8457 17C14.8457 17.5178 14.4526 17.944 13.9482 17.9951L13.8457 18H10.1543C9.60201 18 9.1543 17.5523 9.1543 17C9.1543 16.4477 9.60201 16 10.1543 16H13.8457ZM17.5381 11L17.6406 11.0049C18.1449 11.056 18.5381 11.4822 18.5381 12C18.5381 12.5178 18.1449 12.944 17.6406 12.9951L17.5381 13H6.46191C5.90963 13 5.46191 12.5523 5.46191 12C5.46191 11.4477 5.90963 11 6.46191 11H17.5381ZM20 6C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7C3 6.44772 3.44772 6 4 6H20Z'
            fill='currentColor'
          ></path>
        </svg>
        <span className='text-2xl font-bold'>Bộ lọc tìm kiếm</span>
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
          renderProp={
            categoryData?.data.data.childrens &&
            categoryData.data.data.childrens.map((item) => {
              return (
                <FilterOptionLink
                  key={item.id}
                  queryConfig={queryConfig}
                  pathName={path.vehicle}
                  param='category_id'
                  value={item.id.toString()}
                  label={item.name} // chữ hiển thị bên trái
                  rightBadge={item.count ?? 0} // số bên phải (component sẽ tự bọc badge)
                />
              )
            })
          }
        >
          <div className='text-lg font-semibold'>Loại sản phẩm</div>
        </CollapseItem>

        <div className='h-px bg-zinc-100' />

        {/* Price */}
        <div className='flex items-center justify-between'>
          <div className='text-lg font-semibold'>Price</div>
          <div className='i-chevron-down' />
        </div>
        <div className='h-px bg-zinc-100' />

        {/* Mileage with select */}
        <div className='flex items-center justify-between'>
          <div className='text-lg font-semibold'>Mileage</div>
          <div className='i-chevron-up' />
        </div>
        <div className='mt-3 rounded-2xl bg-zinc-100 px-5 py-3 text-zinc-900 font-medium flex items-center justify-between'>
          <div>All</div>
          <div className='i-chevron-down' />
        </div>
        <div className='h-px bg-zinc-100' />

        {/* Battery range with select */}
        <div className='flex items-center justify-between'>
          <div className='text-lg font-semibold'>Battery range</div>
          <div className='i-chevron-up' />
        </div>
        <div className='mt-3 rounded-2xl bg-zinc-100 px-5 py-3 text-zinc-900 font-medium flex items-center justify-between'>
          <div>All</div>
          <div className='i-chevron-down' />
        </div>
        <div className='h-px bg-zinc-100' />
      </div>
    </div>
  )
}
