/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup'
import {
  CAPACITY_OPTIONS,
  COLOR_OPTIONS,
  MILEAGE_OPTIONS,
  POWER_OPTIONS,
  SEATS_OPTIONS,
  VOLTAGE_OPTIONS
} from '~/constants/options'
import { CategoryType } from '~/types/category.type'

const ONEOF = <T extends { value: string }>(arr: T[]) => arr.map((o) => o.value)
const ONEOFNUMBER = <T extends { value: number }>(arr: T[]) => arr.map((o) => o.value)

// ---------- helpers cho File | URL ----------
const isFile = (v: unknown): v is File => typeof File !== 'undefined' && v instanceof File

const isUrl = (v: unknown): v is string => typeof v === 'string' && /^(https?:\/\/|blob:|data:image\/)/i.test(v.trim())
const IMAGE_MIMES = ['image/jpeg', 'image/png', 'image/webp'] as const
const MAX_SIZE = 5 * 1024 * 1024

const fileOrUrl = yup
  .mixed<File | string>()
  .transform((v) => (typeof v === 'string' ? v.trim() : v))
  .required('Vui lòng tải lên ảnh')
  .test('file-or-url', 'Ảnh phải là File hoặc URL hợp lệ', (v) => isFile(v) || isUrl(v))
  .test('file-type', 'Chỉ JPEG/PNG/WebP', (v) => {
    if (!v || isUrl(v)) return true
    return IMAGE_MIMES.includes(v.type as (typeof IMAGE_MIMES)[number])
  })
  .test('file-size', '≤ 5MB', (v) => {
    if (!v || isUrl(v)) return true
    return v.size <= MAX_SIZE
  })

const baseCommon = yup.object({
  id: yup.number().optional(),
  type: yup.string().required('Vui lòng chọn loại sản phẩm'),
  category_id: yup.number().required('Vui lòng chọn loại xe'),

  brand: yup.string().required('Vui lòng nhập hãng sản xuất'),
  model: yup.string().required('Vui lòng nhập model'),

  warranty: yup.string().required('Vui lòng chọn bảo hành'),

  year: yup
    .number()
    .min(2000, 'Năm sản xuất phải lớn hơn 2000')
    .max(new Date().getFullYear(), `Năm sản xuất không vượt quá ${new Date().getFullYear()}`)
    .typeError('Năm sản xuất phải là số'),

  color: yup.string().oneOf(ONEOF(COLOR_OPTIONS), 'Màu không hợp lệ').required('Vui lòng chọn màu sắc'),

  price: yup
    .number()
    .required('Vui lòng nhập giá')
    .min(500000, 'Giá bán phải lớn hơn 500,000 VNĐ')
    .typeError('Giá bán phải là số'),

  previousOwners: yup
    .number()
    .required('Vui lòng số đời chủ của sản phẩm')
    .min(0, 'Số đời chủ phải lớn hơn 0')
    .max(10, 'Số đời chủ phải bé hơn 10')
    .typeError('Số đời chủ phải là số'),

  health: yup.string().required('Vui lòng chọn tình trạng pin'),
  address: yup.string().required('Vui lòng nhập địa chỉ'),

  title: yup.string().required('Vui lòng nhập tiêu đề').max(50),
  description: yup.string().required('Vui lòng nhập mô tả').max(1500)
})

const imagesFileOnly = yup.object({
  images: yup
    .array()
    .of(
      yup
        .mixed<File>()
        .required('Thiếu file')
        .test('is-file', 'Tệp không hợp lệ', (v): v is File => v instanceof File)
        .test('file-type', 'Chỉ JPEG/PNG/WebP', (v) => !!v && IMAGE_MIMES.includes(v.type as any))
        .test('file-size', '≤ 5MB', (v) => !!v && v.size <= MAX_SIZE)
    )
    .min(1, 'Vui lòng tải lên 1 ảnh')
    .max(6, 'Vui lòng tải lên tối đa 6 ảnh')
    .required('Vui lòng tải lên ảnh'),
  image: yup
    .mixed<File>()
    .required('Vui lòng tải lên ảnh bìa')
    .test('is-file', 'Tệp không hợp lệ', (v): v is File => v instanceof File)
    .test('file-type', 'Chỉ JPEG/PNG/WebP', (v) => !v || IMAGE_MIMES.includes(v.type as any))
    .test('file-size', '≤ 5MB', (v) => !v || v.size <= MAX_SIZE)
})

const imagesFileOrUrl = yup.object({
  images: yup
    .array()
    .of(fileOrUrl.clone().required('Thiếu ảnh'))
    .min(1, 'Vui lòng tải lên 1 ảnh')
    .max(6, 'Vui lòng tải lên tối đa 6 ảnh')
    .required('Vui lòng tải lên ảnh'),
  image: fileOrUrl.clone().required('Vui lòng tải lên ảnh bìa')
})

export const baseSchema = baseCommon.concat(imagesFileOnly)
export const baseSchemaFileOrUrl = baseCommon.concat(imagesFileOrUrl)

export const vehicleSchema = baseSchema.shape({
  power: yup.string().oneOf(ONEOF(POWER_OPTIONS), 'Động cơ không hợp lệ').required('Vui lòng chọn động cơ'),
  seats: yup
    .number()
    .oneOf(ONEOFNUMBER(SEATS_OPTIONS), 'Số chỗ ngồi không hợp lệ')
    .typeError('Số chỗ ngồi phải là số')
    .required('Vui lòng chọn số chỗ ngồi'),
  mileage: yup.string().oneOf(ONEOF(MILEAGE_OPTIONS), 'Mức số km không hợp lệ').required('Vui lòng chọn mức số km'),
  service_id: yup.number().required('Vui lòng chọn gói dịch vụ')
})

export const batterySchema = baseSchema.shape({
  capacity: yup
    .string()
    .oneOf(ONEOF(CAPACITY_OPTIONS), 'Dung lượng pin không hợp lệ')
    .required('Vui lòng chọn dung lượng pin'),
  voltage: yup.string().oneOf(ONEOF(VOLTAGE_OPTIONS), 'Điện áp không hợp lệ').required('Vui lòng chọn điện áp'),
  service_id: yup.number().required('Vui lòng chọn gói dịch vụ')
})

export const vehicleSchemaFileOrUrl = baseSchemaFileOrUrl.shape({
  power: yup.string().oneOf(ONEOF(POWER_OPTIONS), 'Động cơ không hợp lệ').required('Vui lòng chọn động cơ'),
  seats: yup
    .number()
    .oneOf(ONEOFNUMBER(SEATS_OPTIONS), 'Số chỗ ngồi không hợp lệ')
    .typeError('Số chỗ ngồi phải là số')
    .required('Vui lòng chọn số chỗ ngồi'),
  mileage: yup.string().oneOf(ONEOF(MILEAGE_OPTIONS), 'Mức số km không hợp lệ').required('Vui lòng chọn mức số km')
})

export const batterySchemaFileOrUrl = baseSchemaFileOrUrl.shape({
  capacity: yup
    .string()
    .oneOf(ONEOF(CAPACITY_OPTIONS), 'Dung lượng pin không hợp lệ')
    .required('Vui lòng chọn dung lượng pin'),
  voltage: yup.string().oneOf(ONEOF(VOLTAGE_OPTIONS), 'Điện áp không hợp lệ').required('Vui lòng chọn điện áp')
})

type BaseFields = yup.InferType<typeof baseSchema>
type VehicleAll = yup.InferType<typeof vehicleSchema>
type BatteryAll = yup.InferType<typeof batterySchema>
type VehicleOnly = Omit<VehicleAll, keyof BaseFields>
type BatteryOnly = Omit<BatteryAll, keyof BaseFields>
export type PostFormValues = BaseFields & Partial<VehicleOnly> & Partial<BatteryOnly>

export const getPostSchema = (
  categoryType?: Extract<CategoryType, 'vehicle' | 'battery'>
): yup.ObjectSchema<PostFormValues> => {
  switch (categoryType) {
    case CategoryType.vehicle:
      return vehicleSchema as unknown as yup.ObjectSchema<PostFormValues>
    case CategoryType.battery:
      return batterySchema as unknown as yup.ObjectSchema<PostFormValues>
    default:
      return baseSchema as unknown as yup.ObjectSchema<PostFormValues>
  }
}

type BaseFieldsFU = yup.InferType<typeof baseSchemaFileOrUrl>
type VehicleAllFU = yup.InferType<typeof vehicleSchemaFileOrUrl>
type BatteryAllFU = yup.InferType<typeof batterySchemaFileOrUrl>
type VehicleOnlyFU = Omit<VehicleAllFU, keyof BaseFieldsFU>
type BatteryOnlyFU = Omit<BatteryAllFU, keyof BaseFieldsFU>
export type PostFormValuesFileOrUrl = BaseFieldsFU & Partial<VehicleOnlyFU> & Partial<BatteryOnlyFU>

export const getPostSchemaFileOrUrl = (
  categoryType?: Extract<CategoryType, 'vehicle' | 'battery'>
): yup.ObjectSchema<PostFormValuesFileOrUrl> => {
  switch (categoryType) {
    case CategoryType.vehicle:
      return vehicleSchemaFileOrUrl as unknown as yup.ObjectSchema<PostFormValuesFileOrUrl>
    case CategoryType.battery:
      return batterySchemaFileOrUrl as unknown as yup.ObjectSchema<PostFormValuesFileOrUrl>
    default:
      return baseSchemaFileOrUrl as unknown as yup.ObjectSchema<PostFormValuesFileOrUrl>
  }
}
