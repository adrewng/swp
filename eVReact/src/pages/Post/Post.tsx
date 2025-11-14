import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import categoryApi from '~/apis/categories.api'
import postApi from '~/apis/post.api'
import serviceApi from '~/apis/service.api'
import Button from '~/components/Button'
import Input from '~/components/Input'
import Popover from '~/components/Popover'
import { useFormPersist } from '~/hooks/useFormPersist'
import useQueryParam from '~/hooks/useQueryParam'
import { getPostSchema, type PostFormValues } from '~/schemas/post.schema'
import { CategoryType, type CategoryChild } from '~/types/category.type'
import type { Service } from '~/types/service.type'
import { formatNumberToSocialStyle } from '~/utils/util'
import AddressModal from './components/AddressModal'
import BatteryForm from './components/BatteryForm'
import CategoryModal from './components/CategoryModal'
import VehicleForm from './components/VehicleForm'

const PostPage = () => {
  const [showCategoryModal, setShowCategoryModal] = useState(true)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<CategoryChild | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const isVehicleType = selectedCategory?.typeSlug === CategoryType.vehicle
  const isBatteryType = selectedCategory?.typeSlug === CategoryType.battery
  const queryParam = useQueryParam()
  const navigate = useNavigate()
  const schema = getPostSchema(selectedCategory?.typeSlug as Extract<CategoryType, 'vehicle' | 'battery'>)

  const methods = useForm<PostFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      address: '',
      brand: '',
      images: [],
      service_id: 0
    },
    shouldUnregister: true
  })
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors }
  } = methods
  const { saveNow, clear, isRestored } = useFormPersist(methods, {
    storageKeyBase: 'draft:post',
    partitionKey: selectedCategory?.typeSlug
  })

  const { data: categoriesData, isLoading } = useQuery({
    queryKey: ['categoriesDetail'],
    queryFn: () => categoryApi.getCategoryDetailList(),
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false
  })
  const { data: serviceData } = useQuery({
    queryKey: ['services', selectedCategory?.typeSlug],
    queryFn: () => serviceApi.getServices(selectedCategory?.typeSlug as Extract<CategoryType, 'vehicle' | 'battery'>),
    enabled: !!selectedCategory?.typeSlug
  })

  const addPostMutation = useMutation({
    mutationFn: (body: PostFormValues) => postApi.addPost(body)
  })

  const services = useMemo(() => serviceData?.data.data.services ?? [], [serviceData])
  const allCategories = useMemo(() => categoriesData?.data.data || [], [categoriesData])
  const watchedCategoryId = watch('category_id')
  const watchedServiceId = watch('service_id')
  const addressValue = watch('address') ?? ''
  const uploadedImages = watch('images', [] as File[])
  // Restore selectedCategory khi category_id thay đổi
  useEffect(() => {
    if (isRestored && allCategories.length > 0 && watchedCategoryId && !selectedCategory) {
      const categoryParent = allCategories.find((item) =>
        item.childrens?.find((child) => child.id === watchedCategoryId)
      )
      const category = categoryParent?.childrens?.find((child) => child.id === watchedCategoryId)
      if (category) {
        setSelectedCategory(category)
        setShowCategoryModal(false)
      }
    }
  }, [isRestored, allCategories, watchedCategoryId, selectedCategory])
  // Restore selectedService khi service_id thay đổi
  useEffect(() => {
    if (isRestored && services.length > 0 && watchedServiceId && !selectedService) {
      const service = services.find((s) => s.id === watchedServiceId)
      if (service) {
        setSelectedService(service)
      }
    }
  }, [isRestored, services, watchedServiceId, selectedService])

  useEffect(() => {
    if (selectedCategory) {
      setValue('type', selectedCategory.typeSlug)
      setValue('category_id', selectedCategory.id)
    }
  }, [selectedCategory, setValue])

  const handleCategorySelect = (category: CategoryChild) => {
    if (selectedCategory && selectedCategory.id !== category.id) {
      clear()
      methods.reset()
      setSelectedService(null)
    }
    setSelectedCategory(category)
    setShowCategoryModal(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.currentTarget.files ?? [])
    const prev = getValues('images') ?? []
    const seen = new Set<string>()
    const merged = [...prev, ...picked].filter((f) => {
      const k = `${f.name}-${f.size}-${f.lastModified}`
      if (seen.has(k)) return false
      seen.add(k)
      return true
    })
    const next = merged.slice(0, 6)

    setValue('images', next, { shouldValidate: true, shouldDirty: true })
    setValue('image', next[0], { shouldValidate: true, shouldDirty: true })
    e.currentTarget.value = '' // để lần sau chọn lại cùng file vẫn onChange
  }

  const removeImage = (i: number) => {
    const curr = getValues('images') ?? []
    const next = curr.filter((_, idx) => idx !== i)
    setValue('images', next, { shouldValidate: true, shouldDirty: true })
    setValue('image', next[0], { shouldValidate: true, shouldDirty: true })
  }

  // Handle address
  const handleAddressConfirm = (address: string) => {
    setValue('address', address, { shouldValidate: true, shouldDirty: true })
  }

  const onSubmit = handleSubmit((data) => {
    saveNow()
    addPostMutation.mutate(data, {
      onSuccess: async () => {
        await clear()
        toast.success('Đăng tin thành công')
        navigate('/post?draft=true')
      }
    })
  })

  if (!isRestored) return null
  return (
    <>
      {showCategoryModal && (
        <CategoryModal
          categoriesData={categoriesData?.data.data || []}
          isLoading={isLoading}
          onCloseModal={() => setShowCategoryModal(false)}
          showCategoryModal={showCategoryModal}
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
          typeSlug={queryParam.category_type || ''}
        />
      )}

      <div className='min-h-screen bg-white text-zinc-900'>
        <div className='max-w-7xl mx-auto p-6'>
          <FormProvider {...methods}>
            <form onSubmit={onSubmit} className='space-y-8'>
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Left Column - Images */}
                <div className='space-y-6 lg:col-span-1'>
                  <div>
                    <h3 className='text-lg font-semibold mb-4 text-zinc-900'>Hình ảnh sản phẩm</h3>

                    <div className='space-y-4'>
                      <div
                        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors bg-zinc-50/50 ${
                          errors.images
                            ? 'border-red-300 hover:border-red-400'
                            : 'border-zinc-300 hover:border-zinc-400'
                        }`}
                      >
                        <input
                          type='file'
                          multiple
                          accept='image/*'
                          className='hidden'
                          id='image-upload'
                          disabled={uploadedImages.length >= 6}
                          {...register('images')}
                          onChange={handleImageUpload}
                        />
                        <label htmlFor={uploadedImages.length >= 6 ? undefined : 'image-upload'}>
                          <div className='flex flex-col items-center'>
                            <div className='w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mb-4'>
                              <svg
                                className='w-8 h-8 text-zinc-400'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                                />
                              </svg>
                            </div>
                            <p className='text-sm font-semibold text-zinc-700 mb-1'>
                              {uploadedImages.length >= 6 ? 'Đã đủ 6 hình' : 'Thêm hình ảnh'}
                            </p>
                            <p className='text-xs text-zinc-500'>{uploadedImages.length}/6 hình • Tối đa 6 hình</p>
                          </div>
                        </label>
                        {errors.images && (
                          <p className='text-xs text-red-600 mt-2'>{errors.images.message as string}</p>
                        )}
                      </div>

                      {uploadedImages.length > 0 && (
                        <div className='space-y-3'>
                          <div className='flex items-center justify-between'>
                            <h4 className='text-sm font-medium text-zinc-700'>Hình ảnh đã chọn</h4>
                            <span className='text-xs text-zinc-500'>{uploadedImages.length}/6</span>
                          </div>
                          <div className='grid grid-cols-3 gap-2'>
                            {uploadedImages.map((image, index) => (
                              <div
                                key={`${image.name}-${image.size}-${image.lastModified}-${index}`}
                                className='relative group'
                              >
                                <div className='aspect-square rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50'>
                                  <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Upload ${index + 1}`}
                                    className='w-full h-full object-cover'
                                  />
                                </div>
                                <div className='absolute top-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded-full font-medium'>
                                  {index === 0 ? 'Ảnh bìa' : index + 1}
                                </div>
                                <button
                                  type='button'
                                  onClick={() => removeImage(index)}
                                  className='absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100'
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column - Form Fields */}
                <div className='space-y-6 lg:col-span-2'>
                  <div className='bg-zinc-50 p-4 rounded-2xl border border-zinc-200'>
                    <label className='block text-sm font-medium text-zinc-700 mb-2'>Loại sản phẩm - Đăng tin</label>
                    <div className='flex items-center space-x-2'>
                      <span className='text-2xl'>{selectedCategory?.typeSlug === 'battery' ? '🔋' : '🚗'}</span>
                      <span className='font-medium text-zinc-900'>{selectedCategory?.name}</span>
                      <button
                        type='button'
                        onClick={() => setShowCategoryModal(true)}
                        className='ml-auto text-black hover:text-zinc-600 text-sm font-medium transition-colors'
                      >
                        Thay đổi
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className='text-lg font-semibold mb-4 text-zinc-900'>Thông tin chi tiết</h3>

                    {isVehicleType && <VehicleForm />}
                    {isBatteryType && <BatteryForm />}
                    <div className='space-y-4 mt-4'>
                      <Input
                        label='Địa chỉ *'
                        name='address'
                        value={addressValue} // ⬅️ lấy từ form, hỗ trợ khôi phục
                        readOnly
                        placeholder='Chọn địa chỉ'
                        errorMsg={errors.address?.message as string}
                        inputClassName='cursor-pointer pr-10'
                        onClick={() => setShowAddressModal(true)}
                        register={register}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className='text-lg font-semibold mb-4 text-zinc-900'>Tiêu đề tin đăng và Mô tả chi tiết</h3>
                    <div className='space-y-4'>
                      <div>
                        <Input
                          label='Tiêu đề tin đăng *'
                          name='title'
                          placeholder='Nhập tiêu đề tin đăng'
                          errorMsg={errors.title?.message as string}
                          register={register}
                        />
                        <p className='text-xs text-zinc-500 mt-1'>{watch('title')?.length || 0}/50 kí tự</p>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-zinc-700 mb-2'>Mô tả chi tiết *</label>
                        <textarea
                          {...register('description')}
                          rows={6}
                          className='w-full px-3 py-2 border border-zinc-300 rounded-2xl focus:ring-2 focus:ring-black focus:border-black transition-colors'
                          placeholder='Nhập mô tả chi tiết về sản phẩm...'
                        />
                        <div className='mt-1 text-xs text-zinc-500'>
                          <ul className='list-disc list-inside space-y-1'>
                            <li>Xuất xứ, tình trạng chiếc xe</li>
                            <li>Chính sách bảo hành, bảo trì, đổi trả xe</li>
                            <li>Địa chỉ giao nhận, đổi trả xe</li>
                            <li>Thời gian sử dụng xe</li>
                          </ul>
                        </div>
                        <p className='text-xs text-zinc-500 mt-1'>{watch('description')?.length || 0}/1500 kí tự</p>
                        {errors.description && (
                          <p className='text-xs text-red-600 mt-1'>{errors.description.message as string}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Nút Đăng tin và Dịch vụ */}
                  <div className='grid grid-cols-2 gap-4 pt-6'>
                    {/* Dịch vụ đăng tin */}
                    <div className='space-y-3'>
                      <h3 className='text-lg font-semibold text-zinc-900'>Dịch vụ đăng tin</h3>
                      {errors.service_id && (
                        <p className='text-xs text-red-600'>{errors.service_id.message as string}</p>
                      )}

                      <Popover
                        renderProp={
                          <div className='w-80 p-4'>
                            <h4 className='text-lg font-semibold mb-4 text-zinc-900'>Chọn gói dịch vụ</h4>
                            <div className='space-y-3'>
                              {services.map((service: Service) => (
                                <div
                                  key={service.id}
                                  className={`p-3 rounded-xl border cursor-pointer transition-colors ${
                                    selectedService?.id === service.id
                                      ? 'border-black bg-black/5'
                                      : 'border-zinc-200 hover:border-zinc-300'
                                  }`}
                                  onClick={() => {
                                    setSelectedService(service)
                                    setValue('service_id', service.id, { shouldValidate: true, shouldDirty: true })
                                  }}
                                >
                                  <div className='flex items-center justify-between mb-2'>
                                    <h5 className='font-semibold text-zinc-900'>{service.name}</h5>
                                    <span className='text-lg font-bold text-black'>
                                      {formatNumberToSocialStyle(Number(service.price))} VND
                                    </span>
                                  </div>
                                  <p className='text-sm text-zinc-600 mb-2'>{service.description}</p>
                                  {/* <div className='text-xs text-zinc-500'>
                                      <p className='font-medium'>Tính năng:</p>
                                      <p>{plan.features}</p>
                                    </div> */}
                                </div>
                              ))}
                            </div>
                          </div>
                        }
                      >
                        <div className='bg-gradient-to-r from-zinc-50 to-zinc-100 p-4 rounded-2xl border border-zinc-200 hover:border-zinc-300 transition-all cursor-pointer group'>
                          <div className='flex items-center justify-between'>
                            <div className='flex-1'>
                              <p className='font-semibold text-zinc-900 group-hover:text-black transition-colors'>
                                {selectedService ? selectedService.name : 'Chọn gói dịch vụ'}
                              </p>
                              {selectedService && (
                                <p className='text-sm text-zinc-600 mt-1'>{selectedService.description}</p>
                              )}
                            </div>
                            <div className='flex items-center space-x-2'>
                              {selectedService && (
                                <span className='text-lg font-bold text-black'>
                                  {Number(selectedService.price) === 0
                                    ? 'Miễn phí'
                                    : formatNumberToSocialStyle(Number(selectedService.price))}
                                  VND
                                </span>
                              )}
                              <svg
                                className='w-5 h-5 text-zinc-400 group-hover:text-zinc-600 transition-colors'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    </div>

                    {/* Nút Đăng tin */}
                    <div className='flex flex-col justify-end'>
                      <Button
                        type='submit'
                        className='w-full bg-gradient-to-r from-black to-zinc-800 text-white px-6 py-4 rounded-2xl hover:from-zinc-800 hover:to-zinc-700 transition-all text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105'
                      >
                        Đăng tin
                      </Button>
                      {selectedService && (
                        <p className='text-xs text-zinc-500 mt-2 text-center'>Sử dụng gói: {selectedService.name}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>

        {showAddressModal && (
          <AddressModal
            onClose={() => setShowAddressModal(false)}
            onConfirm={handleAddressConfirm}
            defaultAddress={addressValue}
          />
        )}
      </div>
    </>
  )
}

export default PostPage
