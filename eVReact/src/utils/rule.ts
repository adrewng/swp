import * as yup from 'yup'
export const schema = yup.object({
  full_name: yup //
    .string()
    .required('Họ và tên là bắt buộc'),
  phone: yup
    .string() //
    .required('Vui lòng nhập số điện thoại')
    .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số')
    .min(10, 'Ít nhất 10 số')
    .max(11, 'Nhiều nhất 11 số'),
  email: yup //
    .string()
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự')
    .required('Email là bắt buộc'),
  password: yup //
    .string()
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .required('Mật khẩu là bắt buộc'),
  confirm_password: yup //
    .string()
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .required('Mật khẩu là bắt buộc')
    .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp')
})

export const userSchema = yup.object({
  full_name: yup.string().max(160, 'Độ dài tối đa là 160 kí tự'),
  phone: yup.string().max(10, 'Độ dài tối đa là 10 kí tự'),
  email: yup.string().max(160, 'Độ dài tối đa là 160 kí tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 kí tự'),
  address: yup.string().max(1000, 'Độ dài tối đa là 1000 kí tự'),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: schema.fields['confirm_password']
})
export type UserSchema = yup.InferType<typeof userSchema>

export type Schema = yup.InferType<typeof schema>
