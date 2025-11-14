// src/components/NavHeader/components/FavoriteMenu/FavoriteMenu.tsx
import { Link, useNavigate } from 'react-router-dom'
import { path } from '~/constants/path'
import { statusTone } from '~/constants/post'
import type { FavNavData } from '~/types/post.type'
import { formatCurrencyVND, formatUTCDateString, generateNameId, getTimeAgo, isVehicle } from '~/utils/util'

export default function FavoriteMenu({ data }: { data: FavNavData }) {
  const navigate = useNavigate()
  const list = data.items ?? []
  const total = data.total

  return (
    <section className='w-[360px] max-w-[92vw] select-none' aria-label='Tin đã yêu thích'>
      {/* Header */}
      <header className='px-4 pt-3 pb-2 border-b border-gray-200 flex items-center justify-between'>
        <div className='flex flex-col'>
          <span className='text-sm font-semibold text-gray-900'>Tin đã yêu thích</span>
          {typeof total === 'number' && (
            <span className='text-xs text-gray-500'>
              Tổng: <strong>{total}</strong>
            </span>
          )}
        </div>
      </header>

      {/* Body */}
      <div className='relative' aria-live='polite'>
        {!data.isLoading && data.isFetching && (
          <div className='absolute inset-x-0 top-0 h-0.5 overflow-hidden'>
            <div className='h-full w-1/3 animate-[loading_1.2s_linear_infinite] bg-gray-300' />
          </div>
        )}

        {data.isLoading ? (
          <div className='px-4 py-6 text-center text-sm text-gray-600'>Đang tải dữ liệu…</div>
        ) : list.length === 0 ? (
          <div className='px-4 py-10 text-center'>
            <div className='text-sm text-gray-600 font-medium mb-1'>Chưa có tin yêu thích</div>
            <div className='text-xs text-gray-400'>Hãy thêm một vài tin để theo dõi nhanh.</div>
          </div>
        ) : (
          <ul className='max-h-[360px] overflow-auto py-1' role='listbox'>
            {list.map((p, idx) => {
              const product = p.product
              const price = formatCurrencyVND(product?.price ?? '')
              const badge = isVehicle(product) ? 'Xe điện' : 'Pin/Ắc quy'
              const stKey = (p.status as keyof typeof statusTone) ?? 'approved'
              const st = statusTone[stKey] ?? statusTone.approved
              const href = `${path.post}/${generateNameId({ name: p.title, id: p.id })}`
              const canGo = p.status === 'approved' || p.status === 'auctioning'
              return (
                <li key={p.id} role='option' aria-selected='false' className='px-2'>
                  <button
                    onClick={(e) => {
                      if (canGo) {
                        navigate(href)
                      } else {
                        e.stopPropagation()
                        //TODO Gọi hàm delete favorite post ở đây lun
                      }
                    }}
                    disabled={!canGo}
                    aria-disabled={!canGo}
                    className={`w-full group flex items-start gap-3 rounded-lg px-2 py-3 text-left transition
              ${
                canGo
                  ? 'hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10'
                  : 'cursor-not-allowed opacity-60'
              }`}
                  >
                    {/* thumbnail */}
                    <div className='relative flex-shrink-0 size-12 rounded-md overflow-hidden ring-1 ring-gray-200 bg-gray-100'>
                      <img src={product?.image} alt='thumbnail' className='size-full object-cover' loading='lazy' />
                    </div>

                    {/* content */}
                    <div className='min-w-0 flex-1'>
                      <div className='flex items-start justify-between gap-2'>
                        <h4 className='text-sm font-medium text-gray-900 line-clamp-1'>{p.title}</h4>
                        <span className='shrink-0 text-[11px] px-1.5 py-0.5 rounded-full ring-1 bg-slate-50 text-slate-700 ring-slate-200'>
                          {badge}
                        </span>
                      </div>

                      <div className='text-xs text-gray-600 mt-0.5 line-clamp-1'>{price}</div>

                      <div className='mt-1 flex items-center gap-2'>
                        <span className={`text-[11px] px-1.5 py-0.5 rounded-full ring ${st.cls}`}>{st.text}</span>
                        {p.favorite_at && (
                          <span className='text-[11px] text-gray-400'>
                            Đã thêm {getTimeAgo(formatUTCDateString(p.favorite_at))}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>

                  {idx < list.length - 1 && <div className='mx-2 h-px bg-gray-100' />}
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {/* Footer */}
      <footer className='px-3 py-2 border-t border-gray-200 bg-white flex items-center gap-2'>
        <Link
          to={path.accountFavorite /* tạm – sau này đổi sang path favorites */}
          className='inline-flex justify-center items-center flex-1 h-9 rounded-md text-sm font-medium
                     bg-slate-900 text-white hover:bg-black transition'
        >
          Xem tất cả
        </Link>
        {typeof total === 'number' && (
          <span className='text-xs text-gray-400 whitespace-nowrap px-1'>
            Hiển thị {Math.min(list.length, total)}/{total}
          </span>
        )}
      </footer>

      <style>{`
        @keyframes loading { 0% { transform: translateX(-120%); } 100% { transform: translateX(320%); } }
        .animate-[loading_1.2s_linear_infinite] { animation: loading 1.2s linear infinite; }
      `}</style>
    </section>
  )
}
