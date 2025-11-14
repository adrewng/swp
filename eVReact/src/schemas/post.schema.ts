// schemas.ts
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

export const baseSchema = yup.object({
  type: yup.string().required('Vui lòng chọn loại sản phẩm'),
  title: yup.string().required('Vui lòng nhập tiêu đề').max(50),
  description: yup.string().required('Vui lòng nhập mô tả').max(1500),
  price: yup
    .number()
    .required('Vui lòng nhập giá')
    .min(500000, 'Giá bán phải lớn hơn 500,000 VNĐ')
    .typeError('Giá bán phải là số'),
  address: yup.string().required('Vui lòng nhập địa chỉ'),
  brand: yup.string().required('Vui lòng nhập hãng sản xuất'),
  model: yup.string().required('Vui lòng nhập model'),
  year: yup
    .number()
    .min(2000, 'Năm sản xuất phải lớn hơn 2000')
    .max(new Date().getFullYear(), `Năm sản xuất không vượt quá ${new Date().getFullYear()}`)
    .typeError('Năm sản xuất phải là số'),
  images: yup
    .array()
    .of(
      yup
        .mixed<File>()
        .required('Thiếu file')
        .test('is-file', 'Tệp không hợp lệ', (v): v is File => v instanceof File)
        .test(
          'file-type',
          'Chỉ JPEG/PNG/WebP',
          (v) => !!v && ['image/jpeg', 'image/png', 'image/webp'].includes(v.type)
        )
        .test('file-size', '≤ 5MB', (v) => !!v && v.size <= 5 * 1024 * 1024)
    )
    .min(1, 'Vui lòng tải lên 1 ảnh')
    .max(6, 'Vui lòng tải lên tối đa 6 ảnh')
    .required('Vui lòng tải lên ảnh'),
  image: yup
    .mixed<File>()
    .required('Vui lòng tải lên ảnh bìa')
    .test('is-file', 'Tệp không hợp lệ', (v): v is File => v instanceof File)
    .test('file-type', 'Chỉ JPEG/PNG/WebP', (v) => !v || ['image/jpeg', 'image/png', 'image/webp'].includes(v.type))
    .test('file-size', '≤ 5MB', (v) => !v || v.size <= 5 * 1024 * 1024),
  warranty: yup.string().required('Vui lòng chọn bảo hành'),
  category_id: yup.number().required('Vui lòng chọn loại xe'),
  service_id: yup.number().required('Vui lòng chọn gói dịch vụ')
})

export const vehicleSchema = baseSchema.shape({
  power: yup.string().oneOf(ONEOF(POWER_OPTIONS), 'Động cơ không hợp lệ').required('Vui lòng chọn động cơ'),
  seats: yup
    .number()
    .oneOf(ONEOF(SEATS_OPTIONS).map(Number) as number[], 'Số chỗ ngồi không hợp lệ')
    .typeError('Số chỗ ngồi phải là số')
    .required('Vui lòng chọn số chỗ ngồi'),

  mileage: yup.string().oneOf(ONEOF(MILEAGE_OPTIONS), 'Mức số km không hợp lệ').required('Vui lòng chọn mức số km'),

  color: yup.string().oneOf(ONEOF(COLOR_OPTIONS), 'Màu không hợp lệ').required('Vui lòng chọn màu sắc')
})

export const batterySchema = baseSchema.shape({
  capacity: yup
    .string()
    .oneOf(ONEOF(CAPACITY_OPTIONS), 'Dung lượng pin không hợp lệ')
    .required('Vui lòng chọn dung lượng pin'),
  voltage: yup.string().oneOf(ONEOF(VOLTAGE_OPTIONS), 'Điện áp không hợp lệ').required('Vui lòng chọn điện áp'),
  health: yup.string().required('Vui lòng chọn tình trạng pin')
})

type BaseFields = yup.InferType<typeof baseSchema>
type VehicleAll = yup.InferType<typeof vehicleSchema>
type BatteryAll = yup.InferType<typeof batterySchema>

type VehicleOnly = Omit<VehicleAll, keyof BaseFields>
type BatteryOnly = Omit<BatteryAll, keyof BaseFields>

// Superset dùng cho toàn form (các field chuyên biệt để optional)
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
