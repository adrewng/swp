export const nonEmpty = (v: unknown) => !(v === undefined || v === null || v === '')

/**
 * Format số tiền từ VND sang triệu hoặc tỷ
 * @param v - Giá trị VND (ví dụ: 850000000)
 * @returns "850 tr" hoặc "1.05 tỷ"
 */
export const formatVNDMillions = (v: number) => {
  const m = v / 1_000_000 // đổi sang triệu
  if (!isFinite(m)) return ''
  return formatTrieuOrTy(m)
}

/**
 * Format số tiền từ đơn vị triệu sang triệu hoặc tỷ
 * @param v - Giá trị triệu (ví dụ: 850 hoặc 1050)
 * @returns "850 triệu" hoặc "1.05 tỷ"
 */
export const formatTrieuOrTy = (v: number) => {
  // v đang là đơn vị "triệu"
  if (Math.abs(v) >= 1000) {
    const ty = v / 1000 // đổi sang "tỷ"
    const opts: Intl.NumberFormatOptions = Number.isInteger(ty)
      ? {} // nguyên: không hiện phần thập phân
      : { minimumFractionDigits: 2, maximumFractionDigits: 2 } // lẻ: 2 số thập phân
    return `${ty.toLocaleString('vi-VN', opts)} tỷ`
  }

  // < 1000 triệu: giữ đơn vị "triệu"
  const opts: Intl.NumberFormatOptions = Number.isInteger(v)
    ? {}
    : { minimumFractionDigits: 1, maximumFractionDigits: 1 }
  return `${v.toLocaleString('vi-VN', opts)} triệu`
}

export const toNumber = (v: string | number | null | undefined) =>
  typeof v === 'number' ? v : Number(String(v ?? '').replace(/[^0-9.-]/g, '')) || 0
