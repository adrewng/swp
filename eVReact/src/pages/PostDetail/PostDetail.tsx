import { useQuery } from '@tanstack/react-query'
import {
  Armchair,
  Battery,
  BatteryFull,
  Calendar,
  Car,
  Factory,
  Gauge,
  HeartPulse,
  History,
  MapPin,
  Palette,
  Shield,
  ShieldCheck,
  Sparkles,
  Zap
} from 'lucide-react'
import { useMemo } from 'react'

import { Link, useParams } from 'react-router-dom'

import postApi from '~/apis/post.api'
import {
  BATTERY_HEALTH_OPTIONS,
  CAPACITY_OPTIONS,
  COLOR_OPTIONS,
  MILEAGE_OPTIONS,
  POWER_OPTIONS,
  SEATS_OPTIONS,
  VOLTAGE_OPTIONS,
  WARRANTY_OPTIONS
} from '~/constants/options'
import { nonEmpty, toNumber } from '~/utils/formater'
import { labelFromOptions } from '~/utils/option'
import { formatCurrencyVND, formatOwners, generateNameId, getIdFromNameId, isVehicle } from '~/utils/util'

import auctionApi from '~/apis/auction.api'
import AuctionBox from './components/AuctionBox/AuctionBox'
import Gallery from './components/Gallery'
import MarketPriceRange from './components/MarketPriceRange'
import PageSkeleton from './components/PageSkeleton'
import RelatedCard from './components/RelatedCard/RelatedCard'
import SpecRow from './components/SpecRow'

function SkeletonGrid() {
  return (
    <div className='grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className='h-72 animate-pulse rounded-2xl border border-zinc-100 bg-zinc-100' />
      ))}
    </div>
  )
}

export default function PostDetail() {
  const { nameid } = useParams()
  const id = getIdFromNameId(nameid as string)

  // Product detail
  const postQ = useQuery({
    queryKey: ['product', id],
    queryFn: () => postApi.getProductDetail(id),
    select: (r) => r.data.data,
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    // placeholderData: keepPreviousData,
    retry: 1
  })

  const post = postQ.data
  const product = post?.product

  const { data: auctionData } = useQuery({
    queryKey: ['auction-info', id],
    queryFn: () => auctionApi.getAuctionByProduct(Number(id)),
    enabled: !!id
  })

  const relatedQ = useQuery({
    queryKey: ['related-posts', id],
    queryFn: () => postApi.getRelatedPost(id),
    select: (r) => r.data.data.related_posts,
    enabled: !!id,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
    // placeholderData: keepPreviousData
  })

  const specs = useMemo(() => {
    if (!product || !post) return []
    const base = isVehicle(product)
      ? [
          { icon: <Factory className='h-4 w-4' />, label: 'Thương hiệu', value: product.brand },
          { icon: <Car className='h-4 w-4' />, label: 'Tên', value: product.model },
          {
            icon: <Zap className='h-4 w-4' />,
            label: 'Động cơ',
            value: labelFromOptions(POWER_OPTIONS, product.power)
          },
          {
            icon: <Gauge className='h-4 w-4' />,
            label: 'Số km đã đi',
            value: labelFromOptions(MILEAGE_OPTIONS, product.mileage)
          },
          { icon: <Calendar className='h-4 w-4' />, label: 'Năm sản xuất', value: product.year },
          {
            icon: <Armchair className='h-4 w-4' />,
            label: 'Số chỗ ngồi',
            value: labelFromOptions(SEATS_OPTIONS, product.seats)
          },
          {
            icon: <Palette className='h-4 w-4' />,
            label: 'Màu sắc',
            value: labelFromOptions(COLOR_OPTIONS, product.color)
          },
          {
            icon: <HeartPulse className='h-4 w-4' />,
            label: 'Sức khoẻ pin',
            value: labelFromOptions(BATTERY_HEALTH_OPTIONS, product.health)
          },
          {
            icon: <Shield className='h-4 w-4' />,
            label: 'Tình trạng bảo hành',
            value: labelFromOptions(WARRANTY_OPTIONS, product.warranty)
          },
          { icon: <History className='h-4 w-4' />, label: 'Số đời chủ', value: formatOwners(product.previousOwners) }
        ]
      : [
          { icon: <Factory className='h-4 w-4' />, label: 'Thương hiệu', value: product.brand },
          { icon: <Battery className='h-4 w-4' />, label: 'Model', value: product.model },
          {
            icon: <Zap className='h-4 w-4' />,
            label: 'Điện áp',
            value: labelFromOptions(VOLTAGE_OPTIONS, product.voltage)
          },
          {
            icon: <BatteryFull className='h-4 w-4' />,
            label: 'Điện dung',
            value: labelFromOptions(CAPACITY_OPTIONS, product.capacity)
          },
          {
            icon: <HeartPulse className='h-4 w-4' />,
            label: 'Sức khoẻ pin',
            value: labelFromOptions(BATTERY_HEALTH_OPTIONS, product.health)
          },
          { icon: <Calendar className='h-4 w-4' />, label: 'Năm sản xuất', value: product.year },
          { icon: <History className='h-4 w-4' />, label: 'Số đời chủ', value: formatOwners(product.previousOwners) },
          {
            icon: <Shield className='h-4 w-4' />,
            label: 'Tình trạng bảo hành',
            value: labelFromOptions(WARRANTY_OPTIONS, product.warranty)
          },
          {
            icon: <Palette className='h-4 w-4' />,
            label: 'Màu sắc',
            value: labelFromOptions(COLOR_OPTIONS, product.color)
          }
        ]
    return base.filter((s) => nonEmpty(s.value) || s.value === 0)
  }, [product, post])

  if (postQ.isLoading) {
    return <PageSkeleton />
  }

  if (postQ.isError || !post || !product) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-zinc-50 to-white text-zinc-900'>
        <div className='mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10'>
          <div className='rounded-2xl border border-zinc-100 bg-white/90 p-10 text-center shadow-sm'>
            <h2 className='mb-2 text-xl font-semibold text-zinc-900'>Không tìm thấy tin đăng</h2>
            <p className='text-sm text-zinc-500'>Tin đăng này có thể đã bị xóa hoặc không tồn tại.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-50 to-white text-zinc-900'>
      {product && post && (
        <div className='mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10'>
          {/* Top meta */}
          <div className='mb-5 rounded-2xl border border-zinc-100 bg-white/80 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
              <div className='min-w-0'>
                <div className='mb-1 flex flex-wrap items-center gap-2 text-sm text-zinc-500'>
                  <span className='rounded-full bg-zinc-100 px-2 py-0.5'>{product.category.name}</span>
                  <span>•</span>
                  <span className='inline-flex items-center gap-1'>
                    <Calendar className='h-4 w-4' />
                    {new Date(post.created_at).toLocaleDateString('vi-VN')}
                  </span>
                  {product.warranty && (
                    <>
                      <span>•</span>
                      <span className='inline-flex items-center gap-1'>
                        <ShieldCheck className='h-4 w-4' />
                        {labelFromOptions(WARRANTY_OPTIONS, product.warranty)}
                      </span>
                    </>
                  )}
                  {product.address && (
                    <>
                      <span>•</span>
                      <span className='inline-flex items-center gap-1'>
                        <MapPin className='h-4 w-4' />
                        {product.address}
                      </span>
                    </>
                  )}
                </div>
                <h1 className='line-clamp-2 text-2xl font-bold sm:text-3xl'>{post.title}</h1>
              </div>{' '}
            </div>
          </div>

          <div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_25rem]'>
            {/* Left column */}
            <div className='min-w-0 space-y-6'>
              <Gallery images={product.images} />

              {auctionData?.data.data.hasAuction && (
                <div className='rounded-2xl border border-zinc-100 bg-white/90 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70'>
                  <div className='mb-1 text-xs uppercase tracking-wide text-zinc-500'>Giá bán</div>
                  <div className='mb-3 text-3xl font-extrabold'>{formatCurrencyVND(product.price)}</div>
                  <div className='mb-3 text-sm  flex items-center gap-2 justify-start'>
                    <MapPin className='h-4 w-4' />
                    {product.address}
                  </div>

                  <div className='my-3 text-sm text-zinc-500'>
                    Cập nhật: {new Date(post.updated_at).toLocaleDateString('vi-VN')}
                  </div>
                  <div className='mb-4'>
                    <MarketPriceRange
                      min={toNumber(post.ai?.min_price)}
                      max={toNumber(post.ai?.max_price)}
                      listing={toNumber(product.price)}
                      windowText='Theo dữ liệu trong 3 tháng gần nhất'
                    />
                  </div>
                </div>
              )}

              {/* Specs */}
              <section className='rounded-2xl border border-zinc-100 bg-white/90 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70'>
                <div className='mb-4 flex items-center gap-2'>
                  <Gauge className='h-5 w-5' />
                  <h2 className='text-lg font-semibold'>Thông số</h2>
                </div>
                <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                  {specs.map((s, i) => (
                    <SpecRow key={i} icon={s.icon} label={s.label} value={s.value} />
                  ))}
                </div>
              </section>

              {/* Description */}
              <section className='rounded-2xl border border-zinc-100 bg-white/90 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70'>
                <div className='mb-2 flex items-center gap-2'>
                  <Sparkles className='h-5 w-5' />
                  <h2 className='text-lg font-semibold'>Mô tả chi tiết</h2>
                </div>
                <p className='whitespace-pre-line leading-relaxed text-zinc-700'>{product.description}</p>
              </section>

              {/* Related */}
              <section className='rounded-2xl border border-zinc-100 bg-white/90 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70'>
                <div className='mb-3 flex items-center justify-between'>
                  <div>
                    <h2 className='text-lg font-semibold'>Tin đăng tương tự</h2>
                    <p className='mt-1 text-sm text-zinc-500'>Gợi ý theo danh mục, mức giá, vị trí và độ tương đồng.</p>
                  </div>
                </div>

                {relatedQ.isLoading && <SkeletonGrid />}

                {!relatedQ.isLoading &&
                  (relatedQ.data?.length ? (
                    <div className='grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
                      {relatedQ.data!.map((it) => (
                        <RelatedCard key={it.id} item={it} />
                      ))}
                    </div>
                  ) : (
                    <div className='rounded-2xl border border-zinc-100 bg-white/90 p-5 text-sm text-zinc-600'>
                      Chưa có tin tương tự.
                    </div>
                  ))}
              </section>
            </div>

            {/* Right column */}
            <aside className='space-y-4 lg:sticky lg:top-24'>
              {auctionData?.data.data.hasAuction && (
                <AuctionBox product_id={id} auctionData={auctionData.data.data.auction} />
              )}

              {/* Price & actions */}
              {!auctionData?.data.data.hasAuction && (
                <div className='rounded-2xl border border-zinc-100 bg-white/90 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70'>
                  <div className='mb-1 text-xs uppercase tracking-wide text-zinc-500'>Giá bán</div>
                  <div className='mb-3 text-3xl font-extrabold'>{formatCurrencyVND(product.price)}</div>
                  <div className='mb-3 text-sm  flex items-center gap-2 justify-start'>
                    <MapPin className='h-4 w-4' />
                    {product.address}
                  </div>

                  <div className='my-3 text-sm text-zinc-500'>
                    Cập nhật: {new Date(post.updated_at).toLocaleDateString('vi-VN')}
                  </div>
                  <div className='mb-4'>
                    <MarketPriceRange
                      min={toNumber(post.ai?.min_price)}
                      max={toNumber(post.ai?.max_price)}
                      listing={toNumber(product.price)}
                      windowText='Theo dữ liệu trong 3 tháng gần nhất'
                    />
                  </div>
                </div>
              )}

              {/* Seller card */}
              {post.seller && (
                <div className='flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white/90 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70'>
                  <img
                    src={'https://api.iconify.design/solar:user-bold.svg?color=%23a1a1aa'}
                    alt='avatar'
                    className='h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-sm'
                  />
                  <div className='min-w-0 flex-1'>
                    <p className='truncate font-semibold'>
                      {post.seller.full_name || 'Người bán'}{' '}
                      {post.seller.phone && (
                        <span className='ml-1 rounded bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700'>
                          Đã xác minh
                        </span>
                      )}
                    </p>
                    {post.seller.phone && <p className='text-sm text-zinc-500'>{post.seller.phone}</p>}
                  </div>
                  <Link
                    to={`/profile-user/${generateNameId({ name: post.seller.full_name, id: post.seller.id })}`}
                    className='rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium shadow-sm transition hover:bg-zinc-100'
                  >
                    Xem trang
                  </Link>
                </div>
              )}

              {/* Safety / Warranty */}
              <div className='rounded-2xl border border-zinc-100 bg-white/90 p-5 text-sm leading-relaxed text-zinc-600 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70'>
                <p className='mb-2 font-medium'>Lưu ý an toàn</p>
                <ul className='list-disc space-y-1 pl-5'>
                  <li>Kiểm tra xe/pin trực tiếp trước khi giao dịch.</li>
                  <li>Không chuyển tiền cọc nếu chưa xác minh người bán.</li>
                  <li>Giao dịch tại nơi công cộng, giữ liên lạc với người thân.</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  )
}
