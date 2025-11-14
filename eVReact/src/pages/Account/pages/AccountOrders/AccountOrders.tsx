import { useQuery } from '@tanstack/react-query'
import { omit } from 'lodash'
import { Filter, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import orderApi from '~/apis/order.api'
import { OrderCardSkeleton } from '~/components/skeleton'
import { ORDER_TYPE_LABEL, type OrderType } from '~/constants/order'
import useOrderQueryConfig from '~/hooks/useOrderQueryConfig'
import type { Order, OrderListConfig } from '~/types/order.type'
import { formatCurrencyVND } from '~/utils/util'
import OrderCard from './components/OrderCard/OrderCard'
import OrderDetail from './components/OrderDetail/OrderDetail'
import Pagination from './components/Pagination'

export default function AccountOrders() {
  const queryConfig = useOrderQueryConfig()
  const navigate = useNavigate()

  const entries = Object.entries(ORDER_TYPE_LABEL) as [OrderType, string][]

  const [activeTab, setActiveTab] = useState<OrderType>('post')
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<Order | null>(null)
  const [id, setId] = useState<number | string>()

  useEffect(() => {
    const urlType = (queryConfig.type as OrderType) || 'post'
    if (urlType !== activeTab) {
      setActiveTab(urlType)
    }
  }, [queryConfig.type, activeTab])

  const { data: orderData, isLoading } = useQuery({
    queryKey: ['order', queryConfig],
    queryFn: () => orderApi.getOrdersByUser(queryConfig as OrderListConfig)
  })
  const data = orderData?.data?.data
  const openDrawer = (o: Order) => {
    setCurrent(o)
    setOpen(true)
  }

  const handleTypeClick = (key: OrderType) => {
    setActiveTab(key)
    navigate({
      pathname: '',
      search: createSearchParams(omit({ ...queryConfig, type: key, page: '1' }, ['orderId'])).toString()
    })
  }

  return (
    <div className='flex-1 bg-white min-h-screen'>
      <div className='max-w-7xl mx-auto p-6 space-y-6'>
        <div className='mb-6'>
          <div className='text-xs uppercase tracking-wider text-gray-500'>Tài khoản của tôi</div>
          <h1 className='text-3xl font-bold tracking-tight'>Đơn hàng của tôi</h1>
        </div>

        <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
          <div className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
            <div className='text-sm text-gray-500'>Tất cả đơn</div>
            <div className='mt-1 text-2xl font-semibold'>{data?.static.total ?? 0}</div>
          </div>
          <div className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
            <div className='text-sm text-gray-500'>Chờ thanh toán</div>
            <div className='mt-1 text-2xl font-semibold'>{data?.static.total_pending ?? 0}</div>
          </div>
          <div className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
            <div className='text-sm text-gray-500'>Đã thanh toán</div>
            <div className='mt-1 text-2xl font-semibold'>{data?.static.total_paid ?? 0}</div>
          </div>
          <div className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
            <div className='text-sm text-gray-500'>Tổng chi tiêu (ước tính)</div>
            <div className='mt-1 text-2xl font-semibold'>{formatCurrencyVND(data?.static.total_spent ?? 0)}</div>
          </div>
        </div>

        <div className='mt-6 flex flex-wrap items-center gap-2'>
          <div className='flex w-full flex-wrap gap-2 md:w-auto'>
            {entries.map(([key, label]) => {
              const active = activeTab === key
              return (
                <button
                  key={key}
                  onClick={() => handleTypeClick(key)}
                  className={[
                    'rounded-2xl px-3 py-2 text-sm border',
                    active
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 bg-white text-gray-800 hover:bg-gray-50'
                  ].join(' ')}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <div className='ml-auto w-full md:w-96'>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const search = id
                  ? createSearchParams({
                      ...queryConfig,
                      page: '1',
                      orderId: id + ''
                    }).toString()
                  : createSearchParams({
                      ...queryConfig,
                      page: '1'
                    }).toString()
                navigate({
                  pathname: '',
                  search: search
                })
                setId('')
              }}
              className={[
                'group flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 shadow-sm',
                'transition-colors focus-within:border-gray-900 focus-within:ring-4 focus-within:ring-gray-900/5'
              ].join(' ')}
            >
              <Search className='h-4 w-4 text-gray-400 shrink-0' aria-hidden />
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder='Tìm theo mã đơn'
                className='w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none'
                inputMode='search'
                autoComplete='off'
                aria-label='Tìm theo mã đơn'
              />

              {/* Divider (ẩn trên mobile để gọn) */}
              <span className='hidden h-5 w-px bg-gray-200 md:block' aria-hidden />

              <button
                type='submit'
                className={[
                  'inline-flex h-9 items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700',
                  'hover:bg-gray-50 transition-colors'
                ].join(' ')}
              >
                <Filter className='h-4 w-4' />
                Tìm kiếm
              </button>
            </form>
          </div>
        </div>

        <div className='mt-6 grid grid-cols-1 gap-4'>
          {isLoading ? (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <OrderCardSkeleton key={i} />
              ))}
            </>
          ) : (data?.orders?.length ?? 0) === 0 ? (
            <div className='rounded-2xl border border-dashed border-gray-300 p-10 text-center text-sm text-gray-500'>
              Không có đơn phù hợp.
            </div>
          ) : (
            (data?.orders ?? []).map((o: Order) => <OrderCard key={o.id} o={o} onOpen={openDrawer} />)
          )}
        </div>

        {/* Giữ Pagination, đọc từ API */}
        <Pagination pageSize={data?.pagination?.page_size ?? 1} queryConfig={queryConfig} />

        <OrderDetail open={open} onClose={() => setOpen(false)} order={current} />
      </div>
    </div>
  )
}
