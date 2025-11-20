// components/MarketPriceRange.tsx
import { Info } from 'lucide-react'
import { formatVNDMillions } from '~/utils/formater'

type Props = {
  min: number
  max: number
  listing: number
  windowText?: string // ví dụ: "Theo dữ liệu trong 3 tháng gần nhất"
}

export default function MarketPriceRange({
  min,
  max,
  listing,
  windowText = 'Theo dữ liệu trong 3 tháng gần nhất'
}: Props) {
  // --- Guard dữ liệu ---
  const hasRange = Number.isFinite(min) && Number.isFinite(max) && max >= min && min >= 0
  const hasListing = Number.isFinite(listing) && listing >= 0
  if (!hasRange || !hasListing) return null

  // === Track centered quanh listing ===
  // khoảng cách từ listing đến hai đầu min/max
  const spreadLeft = Math.max(0, listing - min)
  const spreadRight = Math.max(0, max - listing)
  // bán kính cơ sở: phía lớn hơn để chắc chắn min/max nằm trong track
  const radius = Math.max(spreadLeft, spreadRight)
  // nới thêm 15% để marker không dính mép
  const radiusPadded = radius * 1.4 || Math.max(listing * 0.4, (max - min) * 0.4)

  // hai bìa track bám quanh listing
  const domainMin = Math.max(0, listing - radiusPadded)
  const domainMax = listing + radiusPadded

  // util
  const clamp = (v: number) => Math.min(domainMax, Math.max(domainMin, v))
  const pct = (v: number) => ((clamp(v) - domainMin) / (domainMax - domainMin)) * 100

  // Tính vị trí % của min, max và listing
  const left = pct(min)
  const width = Math.max(0, pct(max) - pct(min))
  const markerLeft = pct(listing)

  // Mở rộng range fill để marker luôn nằm bên trong (không dính mép)
  let adjustedLeft = left
  let adjustedWidth = width

  // Nếu listing nằm trong range [min, max]
  if (listing >= min && listing <= max) {
    const distanceToMin = markerLeft - left
    const distanceToMax = left + width - markerLeft

    // Padding nhỏ (3%) để marker không dính mép
    const padding = 3

    if (distanceToMax < padding) {
      // Marker gần mép phải → mở rộng bên phải
      adjustedWidth = width + padding
    } else if (distanceToMin < padding) {
      // Marker gần mép trái → mở rộng bên trái
      adjustedLeft = Math.max(0, left - padding)
      adjustedWidth = width + padding
    } else {
      // Marker ở giữa → mở rộng nhẹ cả hai bên
      adjustedLeft = Math.max(0, left - 2)
      adjustedWidth = width + 4
    }
  }
  // Nếu listing nằm ngoài range nhưng gần (trong vòng 10% của range width)
  else {
    const rangeWidth = max - min
    const deviationFromMax = listing > max ? listing - max : 0
    const deviationFromMin = listing < min ? min - listing : 0
    const isNearRange = Math.max(deviationFromMax, deviationFromMin) / rangeWidth <= 0.1

    if (isNearRange) {
      // Mở rộng range fill để bao marker, nhưng không quá nhiều
      const padding = 3
      if (listing > max) {
        adjustedWidth = width + padding
      } else {
        adjustedLeft = Math.max(0, left - padding)
        adjustedWidth = width + padding
      }
    }
  }

  return (
    <div className='rounded-2xl bg-zinc-100 p-4'>
      <div className='mb-1 flex items-center gap-2'>
        <span className='text-base font-semibold'>Khoảng giá thị trường</span>
        <Info className='h-4 w-4 text-zinc-400' aria-hidden />
      </div>
      <p className='mb-3 text-sm text-zinc-500'>{windowText}</p>

      <div className='relative mb-2 h-6'>
        {/* track */}
        <div
          className='absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-white shadow-inner'
          aria-hidden
        />
        {/* range fill (min → max) */}
        <div
          className='absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-blue-600'
          style={{ left: `${adjustedLeft}%`, width: `${adjustedWidth}%` }}
          aria-hidden
        />
        {/* listing marker */}
        <div
          className='absolute -top-5'
          style={{ left: `calc(${markerLeft}% - 14px)` }}
          aria-label={`Giá đăng: ${formatVNDMillions(listing)}`}
        >
          <div className='rounded-md bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white shadow whitespace-nowrap'>
            {formatVNDMillions(listing)}
          </div>
          <div className='mx-auto h-0 w-0 border-x-8 border-t-8 border-x-transparent border-t-blue-600' />
        </div>
      </div>

      {/* labels bám theo vị trí min/max quanh listing */}
      <div className='relative mt-3 h-5 text-sm text-zinc-900'>
        {/* min label (trái của listing) */}
        <span className='absolute -translate-x-1/2 whitespace-nowrap' style={{ left: `${pct(min)}%` }}>
          {formatVNDMillions(min)}
        </span>

        {/* max label (phải của listing) */}
        <span className='absolute -translate-x-1/2 whitespace-nowrap' style={{ left: `${pct(max)}%` }}>
          {formatVNDMillions(max)}
        </span>
      </div>
    </div>
  )
}
