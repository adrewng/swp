// src/schema/updateProfile.schema.ts
import * as yup from 'yup'

const updateProfileSchema = yup.object({
  full_name: yup.string().trim().required('Họ và tên không được bỏ trống').max(100, 'Họ và tên tối đa 100 ký tự'),

  // 1. Thêm .default('') vào trường optional này
  gender: yup.string().oneOf(['Nam', 'Nữ', 'Khác', ''], 'Giới tính không hợp lệ').optional().default(''),

  phone: yup
    .string()
    .trim()
    .matches(/^(?:\+84|0)(?:\d{9,10})$/, 'Số điện thoại không hợp lệ')
    .required('Số điện thoại là bắt buộc'),

  email: yup.string().trim().email('Email không hợp lệ').required('Email là bắt buộc'),

  // 2. Thêm .default('') vào các trường optional khác (address, avatar, description)
  address: yup.string().trim().max(255, 'Địa chỉ tối đa 255 ký tự').optional().default(''),

  avatar: yup.string().url('Ảnh đại diện phải là URL hợp lệ').optional().default(''),

  description: yup.string().trim().max(300, 'Mô tả tối đa 300 ký tự').optional().default('')
})

export default updateProfileSchema
export type UpdateProfileSchema = yup.InferType<typeof updateProfileSchema>
