// VehicleForm.tsx
import { Controller, useFormContext } from 'react-hook-form'
import SelectDropdown from '~/components/SelectDropdown'

import { COLOR_OPTIONS, MILEAGE_OPTIONS, POWER_OPTIONS, SEATS_OPTIONS, WARRANTY_OPTIONS } from '~/constants/options'
import type { PostFormValues } from '~/schemas/post.schema'
import InputStyle from '../InputStyle'

export default function VehicleForm() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<PostFormValues>()
  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Hãng xe */}
        <InputStyle
          label='Hãng xe'
          name='brand'
          placeholder='Nhập hãng xe'
          register={register}
          errorMsg={errors.brand?.message}
        />

        {/* Model xe */}
        <InputStyle
          label='Tên xe'
          name='model'
          placeholder='Nhập tên xe'
          register={register}
          errorMsg={errors.model?.message}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Công suất */}
        <Controller
          name='power'
          control={control}
          render={({ field, fieldState }) => (
            <SelectDropdown
              label='Công suất (W/kW)'
              options={POWER_OPTIONS}
              placeholder='Chọn công suất động cơ'
              errorMsg={fieldState.error?.message}
              value={field.value || ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        <Controller
          name='warranty'
          control={control}
          render={({ field, fieldState }) => (
            <SelectDropdown
              label='Bảo hành *'
              options={WARRANTY_OPTIONS}
              placeholder='Chọn thời gian bảo hành'
              errorMsg={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Số km đã đi */}
        <Controller
          name='mileage'
          control={control}
          render={({ field, fieldState }) => (
            <SelectDropdown
              label='Số km đã đi'
              options={MILEAGE_OPTIONS}
              placeholder='Chọn số km đã đi'
              errorMsg={fieldState.error?.message}
              {...field}
            />
          )}
        />
        {/* Số chỗ ngồi */}
        <Controller
          name='seats'
          control={control}
          render={({ field, fieldState }) => (
            <SelectDropdown
              label='Số chỗ ngồi'
              options={SEATS_OPTIONS}
              placeholder='Chọn số chỗ ngồi'
              errorMsg={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Đời xe */}
        <InputStyle
          label='Đời xe'
          name='year'
          type='number'
          placeholder='Nhập đời xe'
          register={register}
          errorMsg={errors.year?.message}
        />

        {/* Màu sắc */}
        <Controller
          name='color'
          control={control}
          render={({ field, fieldState }) => (
            <SelectDropdown
              label='Màu sắc'
              options={COLOR_OPTIONS}
              placeholder='Chọn màu sắc'
              errorMsg={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </div>
      <InputStyle
        label='Giá bán *'
        name='price'
        type='number'
        placeholder='Nhập giá bán'
        register={register}
        errorMsg={errors.price?.message}
      />
    </div>
  )
}
