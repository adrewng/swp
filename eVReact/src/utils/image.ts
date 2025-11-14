/** === ẢNH HỖN HỢP: File | URL string === */
export type ImageLike = File | string

/** Là File? */
export const isFileLike = (v: ImageLike): v is File => typeof v !== 'string'

/** Chuẩn hoá URL (cắt khoảng trắng) */
export const normalizeUrl = (u: string) => u.trim()

/** Tạo key duy nhất để dedupe: file => name-size-lastModified; url => 'url::...' */
export const imageKey = (v: ImageLike) =>
  isFileLike(v) ? `${v.name}-${v.size}-${v.lastModified}` : `url::${normalizeUrl(v)}`

/** So sánh 2 ImageLike */
export const sameImage = (a: ImageLike, b: ImageLike) => {
  const aIsFile = isFileLike(a)
  const bIsFile = isFileLike(b)
  if (aIsFile && bIsFile)
    return a === b || (a.name === b.name && a.size === b.size && a.lastModified === b.lastModified)
  if (!aIsFile && !bIsFile) return normalizeUrl(a) === normalizeUrl(b)
  return false
}

/** Dedupe + cắt tối đa */
export const dedupeAndTrim = (arr: ImageLike[], limit = 6) => {
  const seen = new Set<string>()
  const out: ImageLike[] = []
  for (const v of arr) {
    const k = imageKey(v)
    if (seen.has(k)) continue
    seen.add(k)
    out.push(v)
    if (out.length >= limit) break
  }
  return out
}

/** Nhanh: check URL có vẻ hợp lệ (nếu bạn muốn siết chặt hơn thì thay regex) */
export const isProbablyUrl = (u: string) => /^https?:\/\/.+/i.test(normalizeUrl(u))
