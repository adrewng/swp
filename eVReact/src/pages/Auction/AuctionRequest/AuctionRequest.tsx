import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'

import { ArrowLeft, Banknote, CheckCircle2, Clock, FileText, Info, Loader2, ShieldCheck, Upload } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import auctionApi from '~/apis/auction.api'
import postApi from '~/apis/post.api'
import { path } from '~/constants/path'
import { auctionSchema, type AuctionSchema } from '~/schemas/auction.schema'
import type { AuctionType } from '~/types/auction.type'
import { formatCurrencyVND, getIdFromNameId, isAxiosPaymentRequiredError } from '~/utils/util'

type FormValue = Pick<AuctionSchema, 'product_id' | 'bidIncrement' | 'buyNowPrice' | 'deposit' | 'note' | 'startingBid'>
const schema = auctionSchema.pick(['product_id', 'bidIncrement', 'buyNowPrice', 'deposit', 'note', 'startingBid'])
export default function AuctionRequest() {
  const navigate = useNavigate()
  const { nameid } = useParams()
  const id = getIdFromNameId(nameid as string)

  const requestMutation = useMutation({
    mutationFn: (body: FormValue) => auctionApi.createAuctionRequest(body as AuctionType)
  })
  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isValid }
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      product_id: Number(id),
      startingBid: '' as unknown as number,
      bidIncrement: '' as unknown as number,
      deposit: '' as unknown as number,
      note: ''
    }
  })
  // Get info
  const { data: productDetail, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => postApi.getProductDetail(id),
    enabled: Boolean(id)
  })

  const post = productDetail?.data.data

  const startingPrice = getValues('startingBid')
  useEffect(() => {
    if (startingPrice) {
      setValue('deposit', 0.1 * startingPrice)
    }
  }, [startingPrice, setValue])

  const disabled = isLoading || !post || !isValid || isSubmitting || requestMutation.isPending

  // Helpers
  const pretty = (n?: number | '' | null) =>
    n === '' || n === undefined || n === null ? '—' : formatCurrencyVND(Number(n))

  const values = watch()

  const onSubmit = (data: FormValue) => {
    requestMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Gữi yêu cầu thành công')
        navigate(path.accountOrders)
      },
      onError: (error) => {
        if (isAxiosPaymentRequiredError<{ data: { checkoutUrl: string } }>(error)) {
          const url = error.response?.data?.data?.checkoutUrl
          if (typeof url === 'string' && /^https?:\/\//.test(url)) {
            window.location.assign(url)
          }
        }
        toast.error('Gữi yêu cầu không thành công')
        navigate(-1)
      }
    })
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-white to-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-6'>
        {/* Header */}
        <div className='mb-6 flex items-center justify-between'>
          <button
            onClick={() => navigate(-1)}
            className='inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-3 py-2 shadow-sm hover:bg-gray-50 transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            <span className='text-sm'>Quay lại</span>
          </button>
        </div>

        {/* Grid 2 cột: Trái thông tin, Phải form */}
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
          {/* LEFT: Product, Specs, Rules, FAQ */}
          <div className='lg:col-span-3 space-y-5'>
            {/* Product card */}
            <section className='rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm'>
              {isLoading ? (
                <ProductSkeleton />
              ) : (
                <div className='flex items-start gap-4'>
                  <div className='w-44 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0'>
                    {post?.product?.image ? (
                      <img
                        src={post.product.image}
                        className='w-full h-full object-cover'
                        alt={post?.title ?? 'image'}
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center text-gray-400'>No image</div>
                    )}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex flex-wrap items-center gap-2 mb-1'>
                      <h1 className='text-xl font-bold text-gray-900 line-clamp-2'>{post?.title}</h1>
                      <span className='inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] px-2 py-0.5'>
                        <ShieldCheck className='w-3.5 h-3.5' />
                        Thông tin sơ bộ
                      </span>
                    </div>
                    <div className='text-sm text-gray-600 flex flex-wrap items-center gap-2'>
                      {post?.product?.category && <span>{post.product.category.name}</span>}
                      {post?.product?.address && (
                        <>
                          <span>•</span>
                          <span>📍 {post.product.address}</span>
                        </>
                      )}
                    </div>
                    <div className='mt-2 inline-flex items-center gap-2 rounded-lg bg-gray-50 px-2.5 py-1.5'>
                      <Banknote className='w-4 h-4' />
                      <span className='font-semibold text-emerald-700'>
                        {post?.product?.price ? formatCurrencyVND(post.product.price) : '—'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Quick specs (nếu có data) */}
            <SectionCard title='Thông số nhanh'>
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                <SpecItem label='Danh mục' value={post?.product?.category?.name} />
                <SpecItem
                  label='Giá tham khảo'
                  value={post?.product?.price ? formatCurrencyVND(post.product.price) : undefined}
                />
                <SpecItem label='Địa chỉ' value={post?.product?.address} />
              </div>
            </SectionCard>

            {/* Tóm tắt cấu hình yêu cầu */}
            <SectionCard title='Tóm tắt cấu hình yêu cầu'>
              <ul className='text-sm text-gray-700 space-y-1'>
                <li className='flex justify-between'>
                  <span>Giá khởi điểm</span>
                  <span className='font-semibold'>{pretty(values.startingBid)}</span>
                </li>
                <li className='flex justify-between'>
                  <span>Giá mua ngay</span>
                  <span className='font-semibold'>{pretty(values.buyNowPrice)}</span>
                </li>
                <li className='flex justify-between'>
                  <span>Bước giá tối thiểu</span>
                  <span className='font-semibold'>{pretty(values.bidIncrement)}</span>
                </li>
                <li className='flex justify-between'>
                  <span>Tiền cọc</span>
                  <span className='font-semibold'>{pretty(values.deposit)}</span>
                </li>
                <li className='flex justify-between'>
                  <span>Tiền phí dịch vụ</span>
                  <span className='font-semibold'>{pretty(Number(post?.product?.price ?? 0) * 0.005)}</span>
                </li>
              </ul>
            </SectionCard>

            {/* Rules / Policy highlights */}
            <SectionCard title='Quy tắc & Chính sách'>
              <ul className='space-y-2 text-sm text-gray-700'>
                <RuleItem
                  icon={<CheckCircle2 className='w-4 h-4' />}
                  text={`Cọc tối thiểu nên là 10% giá trị khởi điểm`}
                />
                <RuleItem
                  icon={<Clock className='w-4 h-4' />}
                  text='Phiên đấu giá mở trong 3–7 ngày theo điều phối của sàn.'
                />
                <RuleItem
                  icon={<FileText className='w-4 h-4' />}
                  text='Hàng hóa phải qua kiểm định trước khi mở phiên.'
                />
              </ul>
            </SectionCard>

            {/* FAQ  */}
            <SectionCard title='Câu hỏi thường gặp'>
              <details className='group rounded-lg border border-gray-200 p-3 open:bg-gray-50 transition-colors'>
                <summary className='flex cursor-pointer select-none items-center justify-between text-sm font-medium text-gray-800'>
                  Vì sao cần cọc trước?
                  <span className='ml-3 text-gray-400 group-open:rotate-180 transition-transform'>▼</span>
                </summary>
                <p className='mt-2 text-sm text-gray-600'>
                  Cọc giúp hạn chế spam và đảm bảo chi phí kiểm định, vận hành phiên.
                </p>
              </details>
              <details className='group rounded-lg border border-gray-200 p-3 open:bg-gray-50 transition-colors mt-2'>
                <summary className='flex cursor-pointer select-none items-center justify-between text-sm font-medium text-gray-800'>
                  Có thể đổi giá sau khi gửi yêu cầu không?
                  <span className='ml-3 text-gray-400 group-open:rotate-180 transition-transform'>▼</span>
                </summary>
                <p className='mt-2 text-sm text-gray-600'>
                  Bạn có thể liên hệ CSKH để cập nhật trước khi phiên được duyệt mở.
                </p>
              </details>
            </SectionCard>
          </div>

          {/* RIGHT: Form + Summary sticky */}
          <div className='lg:col-span-2'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm space-y-5 sticky top-4'
            >
              <header>
                <h3 className='text-lg font-semibold'>Yêu cầu đấu giá</h3>
                <p className='text-xs text-gray-500 mt-0.5'>Hãy nhập những thông tin sau để hoàn đơn yêu cầu của bạn</p>
              </header>

              {/* Giá khởi điểm */}
              <Field label='Giá khởi điểm *' hint='Gợi ý: đặt thấp hơn kỳ vọng ~5–20% để kích hoạt cạnh tranh.'>
                <Controller
                  name='startingBid'
                  control={control}
                  render={({ field }) => (
                    <>
                      <NumberInput
                        value={field.value}
                        onChange={field.onChange}
                        min={0}
                        step={1000}
                        placeholder='Nhập giá khởi điểm'
                      />
                      <LiveValue value={field.value} />
                    </>
                  )}
                />
                {errors.startingBid && <p className='text-xs text-red-600 mt-1'>{errors.startingBid.message}</p>}
              </Field>

              {/* Giá mua ngay) */}
              <Field label='Giá mua ngay' hint='Nếu có người trả tới mức này, hệ thống bán ngay.'>
                <Controller
                  name='buyNowPrice'
                  control={control}
                  render={({ field }) => (
                    <>
                      <NumberInput
                        value={field.value ?? ''}
                        onChange={field.onChange}
                        min={0}
                        step={1000}
                        placeholder='Nhập giá mong muốn bán ngay của sản phẩm'
                      />
                      <LiveValue value={field.value ?? ''} />
                    </>
                  )}
                />
                {errors.buyNowPrice && <p className='text-xs text-red-600 mt-1'>{errors.buyNowPrice.message}</p>}
              </Field>

              {/* Bước giá tối thiểu*/}
              <Field label='Bước giá tối thiểu' hint='Mỗi lần đặt giá kế tiếp phải ≥ (giá hiện tại + bước giá).'>
                <Controller
                  name='bidIncrement'
                  control={control}
                  render={({ field }) => (
                    <>
                      <NumberInput
                        value={field.value}
                        onChange={field.onChange}
                        min={1_000}
                        step={1_000}
                        placeholder='Hãy nhập bước giá tối thiểu thiểu'
                      />
                      <LiveValue value={field.value} />
                    </>
                  )}
                />
                {errors.bidIncrement && <p className='text-xs text-red-600 mt-1'>{errors.bidIncrement.message}</p>}
              </Field>

              {/* Tiền cọc */}
              <Field
                label='Tiền cọc tham gia đấu giá'
                hint={`Đây là số tiền tối thiểu mà người dùng cần cọc trước để người mua có thể tham gia phiên đấu giá (10% giá khởi điểm)`}
              >
                <Controller
                  name='deposit'
                  control={control}
                  render={({ field }) => (
                    <>
                      <NumberInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder='Tiền cọc tham gia (10% giá khởi điểm)'
                        disabled
                      />
                      <LiveValue value={field.value} />
                    </>
                  )}
                />
                {errors.deposit && <p className='text-xs text-red-600 mt-1'>{errors.deposit.message}</p>}
              </Field>

              {/* Ghi chú ngắn */}
              <Field label='Ghi chú (ngắn gọn)'>
                <Controller
                  name='note'
                  control={control}
                  render={({ field }) => (
                    <textarea
                      rows={4}
                      {...field}
                      placeholder='VD: xe một chủ, pin vừa thay, còn hóa đơn...'
                      className='mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/20'
                    />
                  )}
                />
                {errors.note && <p className='text-xs text-red-600 mt-1'>{errors.note.message}</p>}
              </Field>

              {/* Submit */}
              <div className='pt-1'>
                <button
                  type='submit'
                  disabled={disabled}
                  className={classNames(
                    'w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-medium transition-all',
                    disabled
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  )}
                >
                  {requestMutation.isPending || isSubmitting ? (
                    <>
                      <Loader2 className='w-4 h-4 animate-spin' /> Đang gửi yêu cầu…
                    </>
                  ) : (
                    <>
                      <Upload className='w-4 h-4' /> Gửi yêu cầu đấu giá
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

// ====== UI helpers ======
function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className='rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm'>
      <div className='mb-3 text-base font-semibold text-gray-900'>{title}</div>
      {children}
    </section>
  )
}

function SpecItem({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className='rounded-xl border border-gray-200 px-3 py-2 bg-gray-50'>
      <div className='text-[11px] uppercase tracking-wide text-gray-500'>{label}</div>
      <div className='text-sm font-medium text-gray-900 truncate'>{value}</div>
    </div>
  )
}

function RuleItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className='flex items-start gap-2'>
      <span className='mt-0.5 text-emerald-600'>{icon}</span>
      <span>{text}</span>
    </li>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className='text-sm font-medium text-gray-800'>{label}</label>
      {children}
      {hint ? (
        <p className='text-[11px] text-gray-500 mt-1 inline-flex items-center gap-1'>
          <Info className='w-3.5 h-3.5' /> {hint}
        </p>
      ) : null}
    </div>
  )
}

function NumberInput({
  value,
  onChange,
  min,
  step,
  placeholder,
  disabled
}: {
  value: number | ''
  onChange: (v: number | '') => void
  min?: number
  step?: number
  placeholder?: string
  disabled?: boolean
}) {
  return (
    <div className='mt-1 relative'>
      <input
        type='number'
        inputMode='numeric'
        min={min}
        step={step}
        value={value as number | ''}
        onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        placeholder={placeholder}
        className='w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/20 pr-16'
        disabled={disabled}
      />
      <span className='absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500'>VND</span>
    </div>
  )
}

function LiveValue({ value }: { value: number | '' }) {
  return (
    <div className='mt-1 text-xs text-gray-600'>
      {value === '' ? '—' : `= ${formatCurrencyVND(Number(value), 'VND')}`}
    </div>
  )
}

function ProductSkeleton() {
  return (
    <div className='flex items-start gap-4 animate-pulse'>
      <div className='w-44 h-32 rounded-xl bg-gray-100' />
      <div className='flex-1 space-y-3'>
        <div className='h-5 w-2/3 bg-gray-100 rounded' />
        <div className='h-4 w-1/3 bg-gray-100 rounded' />
        <div className='h-8 w-1/2 bg-gray-100 rounded' />
      </div>
    </div>
  )
}
