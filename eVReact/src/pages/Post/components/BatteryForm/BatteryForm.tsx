import { Controller, useFormContext } from 'react-hook-form'
import SelectDropdown from '~/components/SelectDropdown'
import {
  BATTERY_HEALTH_OPTIONS,
  CAPACITY_OPTIONS,
  COLOR_OPTIONS,
  VOLTAGE_OPTIONS,
  WARRANTY_OPTIONS
} from '~/constants/options'
import type { PostFormValues } from '~/schemas/post.schema'
import InputStyle from '../InputStyle'

export default function BatteryForm() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<PostFormValues>()
  return (
    <div className='space-y-4'>
      {/* Brand and Model - Row 1 */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <InputStyle
          label='Hãng pin *'
          name='brand'
          placeholder='Nhập hãng pin'
          register={register}
          errorMsg={errors.brand?.message}
        />
        <InputStyle
          label='Model pin *'
          name='model'
          placeholder='Nhập model pin'
          register={register}
          errorMsg={errors.model?.message}
        />
      </div>

      {/* Capacity and Voltage - Row 2 */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Controller
          name='capacity'
          control={control}
          rules={{ required: 'Vui lòng chọn dung lượng pin' }}
          render={({ field, fieldState }) => (
            <SelectDropdown
              label='Dung lượng (Ah) *'
              options={CAPACITY_OPTIONS}
              placeholder='Chọn dung lượng pin'
              errorMsg={fieldState.error?.message}
              {...field}
            />
          )}
        />
        <Controller
          name='voltage'
          control={control}
          rules={{ required: 'Vui lòng chọn điện áp' }}
          render={({ field, fieldState }) => (
            <SelectDropdown
              label='Điện áp *'
              options={VOLTAGE_OPTIONS}
              placeholder='Chọn điện áp'
              errorMsg={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </div>

      {/* Health and Year - Row 3 */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Controller
          name='health'
          control={control}
          rules={{ required: 'Vui lòng chọn tình trạng pin' }}
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
        <InputStyle
          label='Đời chủ'
          name='previousOwners'
          type='number'
          placeholder='Nhập số đời chủ'
          register={register}
          errorMsg={errors.previousOwners?.message}
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
      {/* Row 4: Giá bán & Bảo hành */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <InputStyle
          label='Giá bán *'
          name='price'
          type='number'
          placeholder='Nhập giá bán'
          register={register}
          errorMsg={errors.price?.message}
        />
        <InputStyle
          label='Năm sản xuất'
          name='year'
          type='number'
          placeholder='Nhập năm sản xuất'
          register={register}
          errorMsg={errors.year?.message}
        />
      </div>
    </div>
  )
}
