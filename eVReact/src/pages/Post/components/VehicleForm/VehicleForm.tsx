// VehicleForm.tsx
import { Controller, useFormContext } from 'react-hook-form'
import SelectDropdown from '~/components/SelectDropdown'

import classNames from 'classnames'
import {
  BATTERY_HEALTH_OPTIONS,
  COLOR_OPTIONS,
  MILEAGE_OPTIONS,
  POWER_OPTIONS,
  SEATS_OPTIONS,
  WARRANTY_OPTIONS
} from '~/constants/options'
import type { PostFormValues } from '~/schemas/post.schema'
import InputStyle from '../InputStyle'

interface Props {
  aiMin?: number
  aiMax?: number
  outOfAiRange?: boolean
}
export default function VehicleForm({ aiMin, aiMax, outOfAiRange }: Props) {
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
              label='Bảo hành'
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
        <Controller
          name='health'
          control={control}
          render={({ field, fieldState }) => (
            <SelectDropdown
              label='Tình trạng pin *'
              options={BATTERY_HEALTH_OPTIONS}
              placeholder='Chọn tình trạng pin'
              errorMsg={fieldState.error?.message}
              {...field}
            />
          )}
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
        <InputStyle
          label='Đời chủ'
          name='previousOwners'
          type='number'
          placeholder='Nhập số đời chủ'
          register={register}
          errorMsg={errors.previousOwners?.message}
        />
      </div>
      <div className='grid grid-cols-1 gap-4'>
        <Controller
          control={control}
          name='price'
          render={({ field }) => (
            <>
              <InputStyle
                {...field}
                label='Giá bán'
                type='number'
                className='w-full rounded-2xl outline-none focus:ring-2 focus:ring-black'
                placeholder='Nhập giá bán'
                errorMsg={errors.price?.message}
              />
              {aiMin && aiMax && (
                <div
                  id='price-hint'
                  className={classNames(
                    'text-xs rounded-xl px-2 pb-4 inline-flex items-center gap-2',
                    outOfAiRange
                      ? 'bg-amber-50 text-amber-800 ring-1 ring-amber-200'
                      : 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                  )}
                >
                  <span className='font-medium'>Gợi ý AI:</span>
                  <span>{aiMin && aiMax ? `${aiMin.toLocaleString()} – ${aiMax.toLocaleString()} đ` : '—'}</span>
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
              )}
            </>
          )}
        />
      </div>
    </div>
  )
}
