/* eslint-disable @typescript-eslint/no-explicit-any */
/* src/pages/UpdateRejectedPostPretty.tsx */
import classNames from 'classnames'
import { MapPin, Plus, XCircle } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import Button from '~/components/Button'
import Input from '~/components/Input'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import postApi from '~/apis/post.api'
import BatteryForm from '~/pages/Post/components/BatteryForm'
import VehicleForm from '~/pages/Post/components/VehicleForm'
import { getPostSchemaFileOrUrl, type PostFormValuesFileOrUrl } from '~/schemas/post.schema'
import AddressModal from '../Post/components/AddressModal'

// ⭐ Helpers cho ảnh hỗn hợp (File | URL) – đã thêm trong util của bạn
import { imageApi } from '~/apis/image.api'
// import type { PostType } from '~/types/post.type'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import type { CategoryType } from '~/types/category.type'
import { dedupeAndTrim, imageKey, isFileLike, sameImage, type ImageLike } from '~/utils/image'
import { getIdFromNameId } from '~/utils/util'

const MAX_IMAGES = 6

// const vehicleMock: PostType = {
//   id: 202,
//   title: 'Adrew',
//   priority: 1,
//   created_at: '2025-10-19T11:39:41.000Z',
//   updated_at: '2025-10-20T03:57:04.000Z',
//   end_date: '2025-11-18T11:39:41.000Z',
//   status: 'rejected',
//   product: {
//     id: 202,
//     brand: 'VinFast',
//     model: 'VF 3',
//     price: '500000.00',
//     description: 'Adrew',
//     year: 2024,
//     warranty: '6',
//     address: 'Phường Ba Đình, Thành phố Hà Nội',
//     color: 'black',
//     seats: 2,
//     mileage: '5000',
//     power: '200',
//     health: 'good',
//     previousOwners: 1,
//     category: {
//       id: 1,
//       name: 'Electric Car',
//       typeSlug: 'vehicle'
//     },
//     image: 'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760848779/demo-node-ts/xddw0lvlftusfkd9dqer.jpg',
//     images: [
//       'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760848779/demo-node-ts/xddw0lvlftusfkd9dqer.jpg',
//       'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760848778/demo-node-ts/kfbzaw69ftqnht57beus.jpg',
//       'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760848779/demo-node-ts/eqjso29a7udmy9xzwbkp.jpg',
//       'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760848779/demo-node-ts/i5fpmgrnnr5fmwzqgxjh.jpg'
//     ]
//   },
//   seller: {
//     id: 12,
//     full_name: 'Nhật Trường',
//     email: 'nhatruong5012@gmail.com',
//     phone: '0911973863'
//   },
//   ai: {
//     min_price: 300000000,
//     max_price: 330000000
//   }
// } // giữ nguyên nếu cần

// const batteryMock: PostType = {
//   id: 301,
//   title: 'PIN LFP 48V 50Ah – còn rất mới',
//   priority: 1,
//   created_at: '2025-10-10T02:20:12.000Z',
//   updated_at: '2025-10-19T05:00:00.000Z',
//   end_date: '2025-11-09T02:20:12.000Z',
//   product: {
//     id: 2,
//     brand: 'CATL',
//     model: 'LFP-48-50',
//     capacity: '50',
//     price: '8500000',
//     address: 'Quận 7, TP.HCM',
//     description: 'Pin tháo xe điện, tình trạng tốt, kèm BMS.',
//     category: { id: 2, name: 'Car Battery', typeSlug: 'battery' },
//     voltage: '48v',
//     health: 'good',
//     year: 2023,
//     image: 'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760849470/demo-node-ts/gwbuszse1boyfine03yz.jpg',
//     images: [
//       'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760849470/demo-node-ts/gwbuszse1boyfine03yz.jpg',
//       'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760849470/demo-node-ts/dpew2fxaixro1jufvzwo.jpg',
//       'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760849470/demo-node-ts/gifnbdoybefcjaea1rai.jpg',
//       'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760849471/demo-node-ts/icncczogebbutplexp2r.jpg'
//     ],
//     warranty: '6',
//     color: 'black',
//     previousOwners: 1,
//     rejected_reason: 'Thiếu chứng từ nguồn gốc; vui lòng bổ sung trong mô tả.'
//   },
//   ai: { min_price: 7500000, max_price: 9000000 }
// }

// type FormValues = {
//   type?: CategoryType
//   category_id?: number
//   brand?: string
//   model?: string
//   title: string
//   description: string
//   price: number
//   address: string
//   images: ImageLike[]
//   image?: ImageLike
//   // vehicle
//   power?: string
//   mileage?: string
//   year?: number
//   seats?: number
//   color?: string
//   warranty?: string
//   health?: string
//   previousOwners?: number
//   // battery
//   capacity?: string
//   voltage?: string
// }

export default function UpdateRejectedPostPretty() {
  const [showAddressModal, setShowAddressModal] = useState(false)
  const navigate = useNavigate()
  const qc = useQueryClient()
  const { nameid } = useParams()
  const id = getIdFromNameId(nameid as string)
  const { data: postDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => postApi.getProductDetail(id as string),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false
  })
  const post = postDetailData?.data.data

  const category = post?.product.category.typeSlug as Extract<CategoryType, 'vehicle' | 'battery'> | undefined
  const schema = useMemo(() => getPostSchemaFileOrUrl(category), [category])
  const methods = useForm<PostFormValuesFileOrUrl>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      address: '',
      images: [],
      image: ''
    }
  })

  const {
    setValue,
    watch,
    control,
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { errors }
  } = methods

  const mapPostToForm = (post: any): PostFormValuesFileOrUrl => {
    const p = post.product
    const base: PostFormValuesFileOrUrl = {
      id: p.id,
      type: p.category.typeSlug,
      category_id: p.category.id,
      brand: p.brand,
      model: p.model,
      title: post.title,
      description: p.description ?? '',
      price: Number(p.price ?? 0),
      address: p.address ?? '',
      images: (p.images ?? (p.image ? [p.image] : [])) as ImageLike[],
      image: (p.image ?? p.images?.[0]) as ImageLike,
      year: p.year,
      color: p.color,
      warranty: p.warranty,
      health: p.health,
      previousOwners: p.previousOwners
    }

    return p.category.typeSlug === 'vehicle'
      ? { ...base, power: p.power, mileage: p.mileage, seats: p.seats }
      : { ...base, capacity: p.capacity, voltage: p.voltage }
  }
  useEffect(() => {
    if (!post) return
    reset(mapPostToForm(post))
  }, [post, reset])

  const aiMin = post?.ai?.min_price ?? 0
  const aiMax = post?.ai?.max_price ?? 0
  const price = watch('price')
  const outOfAiRange = Boolean(aiMin) && Boolean(aiMax) && typeof price === 'number' && (price < aiMin || price > aiMax)

  const uploadFiles = async (files: File[]) => {
    if (!files.length) return [] as string[]
    const res = await imageApi.uploadFiles(files)
    return res.data.files.map((f) => f.url) || []
  }

  const updatePostMutation = useMutation({
    mutationFn: (body: PostFormValuesFileOrUrl) => postApi.updatePostRejected(body)
  })

  const setImagesAndCover = (arr: ImageLike[]) => {
    setValue('images', arr, { shouldValidate: true, shouldDirty: true })
    setValue('image', arr[0], { shouldValidate: true, shouldDirty: true })
  }

  const addImages = (incoming: ImageLike[]) => {
    const prev = (getValues('images') ?? []) as ImageLike[]
    const next = dedupeAndTrim([...prev, ...incoming], MAX_IMAGES)
    setImagesAndCover(next)
  }

  const handlePickFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.currentTarget.files ?? []) as ImageLike[]
    addImages(picked)
    e.currentTarget.value = ''
  }

  const makeCover = (idx: number) => {
    const arr = (getValues('images') ?? []) as ImageLike[]
    if (idx <= 0 || idx >= arr.length) return
    const item = arr[idx]
    if (sameImage(arr[0], item)) return
    const next = [item, ...arr.slice(0, idx), ...arr.slice(idx + 1)]
    setImagesAndCover(next.slice(0, MAX_IMAGES))
  }

  const removeImage = (i: number) => {
    const curr = (getValues('images') ?? []) as ImageLike[]
    const next = curr.filter((_, idx) => idx !== i)
    if (!next.length) {
      setValue('images', [], { shouldValidate: true, shouldDirty: true })
      setValue('image', '', { shouldValidate: true, shouldDirty: true })
      return
    }
    setImagesAndCover(next)
  }

  const PreviewImage = ({ item }: { item: ImageLike }) => {
    const src = useMemo(() => {
      if (!isFileLike(item)) return item
      return URL.createObjectURL(item)
    }, [item])
    return <img src={src} className='w-full h-full object-cover' />
  }

  const transformImagesToUrls = async (images: ImageLike[], cover: ImageLike | undefined) => {
    const orderKeys = images.map(imageKey)

    const files: globalThis.File[] = images.filter(isFileLike)
    const urlsAlready = images.filter((v) => !isFileLike(v)).map((v) => String(v))

    // upload file lấy URL
    const uploadedUrls = await uploadFiles(files)

    // map File key -> uploaded url
    const fileKeys = files.map(imageKey)
    const fileKeyToUrl = new Map<string, string>()
    for (let i = 0; i < files.length; i++) {
      fileKeyToUrl.set(fileKeys[i], uploadedUrls[i])
    }

    // map key -> url chung
    const keyToUrl = new Map<string, string>()
    for (const u of urlsAlready) keyToUrl.set(`url::${u}`, u)
    for (const [k, u] of fileKeyToUrl.entries()) keyToUrl.set(k, u)

    // dựng mảng url theo đúng thứ tự ban đầu
    const finalUrls: string[] = []
    for (const k of orderKeys) {
      const u = keyToUrl.get(k)
      if (u) finalUrls.push(u)
    }

    // dùng cover nếu có để đảm bảo đứng đầu & trả ra finalCover đúng
    let finalCover: string | undefined
    const coverKey = cover ? imageKey(cover) : undefined
    if (coverKey) {
      const coverUrl = keyToUrl.get(coverKey)
      if (coverUrl) {
        finalCover = coverUrl
        const idx = finalUrls.indexOf(coverUrl)
        if (idx > 0) {
          finalUrls.splice(idx, 1)
          finalUrls.unshift(coverUrl)
        } else if (idx === -1) {
          finalUrls.unshift(coverUrl)
        }
      }
    }
    if (!finalCover) finalCover = finalUrls[0]

    return { finalUrls, finalCover }
  }

  const onSave = handleSubmit(async (vals) => {
    const { finalUrls, finalCover } = await transformImagesToUrls(vals.images, vals.image)
    const body = {
      ...vals,
      images: finalUrls,
      image: finalCover
    }
    updatePostMutation.mutate(body, {
      onSuccess: async () => {
        toast.success('Cập nhật tin thành công')
        qc.invalidateQueries({
          queryKey: ['post-me', { limit: '12', page: '1', status: 'rejected' }],
          exact: true
        })
        navigate(-1)
      },
      onError: () => {
        toast.error('Cập nhật tin không thành công')
        navigate(-1)
      }
    })
  })

  return (
    <div className='min-h-screen bg-white text-zinc-900'>
      {post && (
        <div className='max-w-7xl mx-auto p-6'>
          {/* Top bar */}
          <div className='mb-5 flex flex-wrap items-center justify-between gap-3'>
            <div>
              <div className='text-sm text-zinc-500'>Bài đăng #{post.id}</div>
              <h1 className='text-xl font-semibold'>Cập nhật bài đăng (bị từ chối)</h1>
            </div>
          </div>

          {/* Reject banner */}
          {'rejected_reason' in post.product && post.product.rejected_reason && (
            <div className='mb-5 rounded-2xl border border-rose-200 bg-rose-50 p-4'>
              <div className='flex items-start gap-3'>
                <XCircle className='mt-0.5 h-5 w-5 text-rose-600' />
                <div>
                  <div className='font-medium text-rose-700'>Tin của bạn bị từ chối</div>
                  <div className='text-sm text-rose-700/90'>{post.product.rejected_reason}</div>
                </div>
              </div>
            </div>
          )}

          {/* Summary */}
          <div className='mb-6 grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <div className='lg:col-span-1'>
              <div className='rounded-2xl border border-zinc-200 p-3 bg-zinc-50'>
                <img
                  src={(post.product as any).image || (post.product as any).images?.[0]}
                  alt=''
                  className='h-40 w-full rounded-xl object-cover'
                />
                <div className='mt-2 text-sm text-zinc-500'>{post.product.category.name}</div>
              </div>
            </div>
            <div className='lg:col-span-2 rounded-2xl border border-zinc-200 p-4'>
              <div className='mb-1 text-lg font-semibold'>{post.title}</div>
              <div className='text-sm text-zinc-600 flex items-center gap-2'>
                <MapPin className='h-4 w-4' />
                {(post.product as any).address}
              </div>
            </div>
          </div>

          <FormProvider {...methods}>
            <form className='space-y-8' onSubmit={onSave}>
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Left – Images preview + Add tile */}
                <div className='space-y-6 lg:col-span-1'>
                  <div>
                    <h3 className='text-lg font-semibold mb-4'>Hình ảnh sản phẩm</h3>

                    <Controller
                      control={control}
                      name='images'
                      render={({ field }) => {
                        const arr = Array.isArray(field.value) ? (field.value as ImageLike[]) : []
                        const canAddMore = arr.length < MAX_IMAGES

                        return (
                          <>
                            <div className='grid grid-cols-3 gap-2'>
                              {arr.map((it: ImageLike, idx) => (
                                <div key={`${idx}`} className='relative group'>
                                  <div className='aspect-square rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50'>
                                    <PreviewImage item={it} />
                                  </div>
                                  <div className='absolute top-1 left-1'>
                                    <span
                                      className={classNames(
                                        'px-1.5 py-0.5 rounded-full text-[11px] font-medium',
                                        idx === 0 ? 'bg-black/80 text-white' : 'bg-black/60 text-white'
                                      )}
                                    >
                                      {idx === 0 ? 'Ảnh bìa' : idx + 1}
                                    </span>
                                  </div>
                                  <div className='absolute bottom-1 right-1 hidden group-hover:flex gap-1'>
                                    {idx !== 0 && (
                                      <button
                                        type='button'
                                        className='text-xs px-2 py-1 rounded-lg bg-white/90 border'
                                        onClick={() => makeCover(idx)}
                                      >
                                        Đặt bìa
                                      </button>
                                    )}
                                    <button
                                      type='button'
                                      className='text-xs px-2 py-1 rounded-lg bg-white/90 border'
                                      onClick={() => removeImage(idx)}
                                    >
                                      Xoá
                                    </button>
                                  </div>
                                </div>
                              ))}

                              {/* Ô “+ Thêm ảnh” là item cuối cùng */}
                              {canAddMore && (
                                <label
                                  className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors bg-zinc-50/50 ${
                                    errors.images
                                      ? 'border-red-300 hover:border-red-400'
                                      : 'border-zinc-300 hover:border-zinc-400'
                                  }`}
                                  title='Thêm ảnh'
                                >
                                  <input
                                    type='file'
                                    multiple
                                    accept='image/*'
                                    onChange={handlePickFiles}
                                    className='sr-only'
                                  />
                                  <div className='flex flex-col items-center gap-1 text-zinc-600'>
                                    <Plus className='w-6 h-6' />
                                    <span className='text-xs'>Thêm ảnh</span>
                                    <span className='text-[10px] text-zinc-400'>
                                      {arr.length}/{MAX_IMAGES}
                                    </span>
                                  </div>
                                </label>
                              )}
                            </div>
                            {errors.images && (
                              <p className='text-xs text-red-600 mt-2'>{errors.images.message as string}</p>
                            )}
                          </>
                        )
                      }}
                    />
                  </div>
                </div>

                {/* Right – Fields */}
                <div className='space-y-6 lg:col-span-2'>
                  <div className='bg-zinc-50 p-4 rounded-2xl border border-zinc-200'>
                    <label className='block text-sm font-medium text-zinc-700 mb-2'>Loại sản phẩm - Cập nhật</label>
                    <div className='flex items-center gap-2'>
                      <span className='text-2xl'>{category === 'battery' ? '🔋' : '🚗'}</span>
                      <span className='font-medium'>{post.product.category.name}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold mb-4'>Thông tin chi tiết</h3>
                    {category === 'vehicle' ? (
                      <VehicleForm aiMin={aiMin} aiMax={aiMax} outOfAiRange={outOfAiRange} />
                    ) : (
                      <BatteryForm />
                    )}

                    <div className='space-y-4 mt-4'>
                      <Input
                        label='Địa chỉ *'
                        name='address'
                        readOnly
                        placeholder='Chọn địa chỉ'
                        errorMsg={errors.address?.message as string}
                        inputClassName='cursor-pointer pr-10'
                        onClick={() => setShowAddressModal(true)}
                        register={register}
                      />
                    </div>
                  </div>
                  {/* AI gợi ý (màu theo range)
                  <div className='grid grid-cols-1 gap-4'>
                    <div>
                      <Controller
                        control={control}
                        name='price'
                        render={({ field }) => (
                          <>
                            <InputStyle
                              {...field}
                              label='Giá bán'
                              type='number'
                              className='w-full rounded-2xl border border-zinc-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black'
                              placeholder='Nhập giá bán'
                              aria-describedby='price-hint'
                            />
                            <div
                              id='price-hint'
                              className={classNames(
                                'mt-1.5 text-xs rounded-xl px-2 py-1 inline-flex items-center gap-2',
                                outOfAiRange
                                  ? 'bg-amber-50 text-amber-800 ring-1 ring-amber-200'
                                  : 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                              )}
                            >
                              <span className='font-medium'>Gợi ý AI:</span>
                              <span>
                                {aiMin && aiMax ? `${aiMin.toLocaleString()} – ${aiMax.toLocaleString()} đ` : '—'}
                              </span>
                              {aiMin && aiMax && (
                                <button
                                  type='button'
                                  onClick={() => {
                                    const mid = Math.round((aiMin + aiMax) / 2)
                                    field.onChange(mid)
                                  }}
                                  className='ml-2 underline underline-offset-2'
                                >
                                  Dùng mức giữa
                                </button>
                              )}
                            </div>
                          </>
                        )}
                      />
                    </div>
                  </div> */}
                  <div>
                    <h3 className='text-lg font-semibold mb-4'>Tiêu đề tin đăng và Mô tả chi tiết</h3>
                    <div className='space-y-4'>
                      <Input
                        label='Tiêu đề tin đăng *'
                        name='title'
                        placeholder='Nhập tiêu đề tin đăng'
                        errorMsg={errors.title?.message as string}
                        register={register}
                      />
                      <div>
                        <label className='block text-sm font-medium text-zinc-700 mb-2'>Mô tả chi tiết *</label>
                        <Controller
                          control={control}
                          name='description'
                          render={({ field }) => (
                            <textarea
                              {...field}
                              rows={6}
                              className='w-full px-3 py-2 border border-zinc-300 rounded-2xl focus:ring-2 focus:ring-black focus:border-black'
                              placeholder='Nhập mô tả chi tiết về sản phẩm...'
                            />
                          )}
                        />
                        {errors.description && (
                          <p className='text-xs text-red-600 mt-1'>{String(errors.description.message)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className='flex flex-wrap items-center gap-3 pt-2'>
                    <Button
                      type='submit'
                      className='w-full bg-gradient-to-r from-black to-zinc-800 text-white px-6 py-4 rounded-2xl hover:from-zinc-800 hover:to-zinc-700 transition-all text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105'
                      isLoading={updatePostMutation.isPending}
                      disabled={updatePostMutation.isPending}
                    >
                      Gữi lại
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      )}

      {showAddressModal && (
        <AddressModal
          onClose={() => setShowAddressModal(false)}
          onConfirm={(address) => setValue('address', address, { shouldValidate: true, shouldDirty: true })}
          defaultAddress={getValues('address')}
        />
      )}
    </div>
  )
}
