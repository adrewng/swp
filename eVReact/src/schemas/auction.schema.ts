import * as yup from 'yup'

// Helper: chuyển '' → NaN để Yup bắt lỗi type/required cho number
const toNumberOrNaN = (v: unknown, o: unknown) => (o === '' || o === null ? NaN : Number(v))

export const auctionSchema = yup.object({
  product_id: yup.number().required(),
  // Giá khởi điểm
  startingBid: yup
    .number()
    .transform(toNumberOrNaN)
    .typeError('Vui lòng nhập số hợp lệ')
    .required('Giá khởi điểm là bắt buộc')
    .moreThan(0, 'Giá khởi điểm phải > 0'),

  //Giá mua ngay
  buyNowPrice: yup
    .number()
    .transform(toNumberOrNaN)
    .typeError('Vui lòng nhập số hợp lệ')
    .required('Giá mua ngay là bắt buộc')
    .test('greater-than-starting', 'Giá mua ngay phải lớn hơn giá khởi điểm', function (value) {
      if (value == null) return true
      const starting = this.parent.startingBid
      if (typeof starting !== 'number' || Number.isNaN(starting)) return true
      return value > starting
    }),

  bidIncrement: yup
    .number()
    .transform(toNumberOrNaN)
    .typeError('Bước giá phải là số')
    .required('Bước giá là bắt buộc')
    .moreThan(0, 'Bước giá phải > 0'),

  deposit: yup.number().transform(toNumberOrNaN).typeError('Tiền cọc phải là số').required('Tiền cọc là bắt buộc'),
  note: yup.string().max(500, 'Tối đa 500 ký tự').default('')
})

export type AuctionSchema = yup.InferType<typeof auctionSchema>
