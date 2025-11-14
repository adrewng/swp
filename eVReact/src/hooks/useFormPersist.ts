import { del, get, set } from 'idb-keyval'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import useQueryParam from './useQueryParam'

type Options<TForm extends FieldValues> = {
  /** Khóa gốc cho bản nháp, ví dụ: "draft:post". Mặc định "draft:form" */
  storageKeyBase?: string
  /** Phân mảnh theo typeSlug/slug của form để tách nháp cho từng loại */
  partitionKey?: string
  /** Chọn field nào sẽ được lưu JSON (mặc định: bỏ qua File/Blob) */
  includeKeys?: (keyof TForm)[]
  excludeKeys?: (keyof TForm)[]
}

type PersistApi = {
  /** Ép lưu ngay lập tức (gọi trước khi chuyển qua thanh toán) */
  saveNow: () => Promise<void>
  /** Xóa toàn bộ bản nháp của phân mảnh hiện tại */
  clear: () => Promise<void>
  /** Đã khôi phục xong hay chưa (hữu ích nếu cần chặn render sớm) */
  isRestored: boolean
}

// Tạo khóa ảnh dựa trên tên, kích thước và thời gian sửa đổi
const imageKey = (f: File) => `${f.name}-${f.size}-${f.lastModified}`
// Tạo khóa JSON dựa trên base và part
const makeJsonKey = (base: string, part?: string | number | null) => `${base}${part ? `:${String(part)}` : ''}`
// Tạo khóa ảnh dựa trên base và part
const makeImgKey = (base: string, part?: string | number | null) => `${makeJsonKey(base, part)}:images`

// Kiểm tra nếu là File/Blob
function isFileLike(v: unknown): v is File | Blob {
  return v instanceof File || v instanceof Blob
}

// Lọc nhưng trường nào đc lưu vài LS (bỏ qua File/Blob và mảng File)
function pickSerializable<T extends Record<string, unknown>>(values: T, include?: string[], exclude?: string[]) {
  const out: Record<string, unknown> = {}
  const keys = include?.length ? include : Object.keys(values)
  for (const k of keys) {
    if (exclude?.includes(k)) continue
    const val = values[k]
    if (isFileLike(val)) continue
    if (Array.isArray(val) && val.some(isFileLike)) continue
    out[k] = val
  }
  return out as Partial<T>
}

// Lưu từng file vào IDB, metadata vào localStorage
async function saveImagesToIDB(idbKey: string, files: File[]) {
  const meta: Record<string, { name: string; size: number; lastModified: number; type: string }> = {}
  const ops: Promise<void>[] = []
  for (const f of files) {
    const k = imageKey(f)
    meta[k] = { name: f.name, size: f.size, lastModified: f.lastModified, type: f.type }
    ops.push(set(`${idbKey}:${k}`, f))
  }
  await Promise.all(ops) // Lưu từng file vào IDB
  localStorage.setItem(idbKey, JSON.stringify(meta)) // Lưu metadata ở localStorage
}

// Tải từng file từ IDB, metadata ở localStorage
async function loadImagesFromIDB(idbKey: string) {
  const raw = localStorage.getItem(idbKey)
  if (!raw) return [] as File[]
  const meta = JSON.parse(raw) as Record<string, { name: string; size: number; lastModified: number; type: string }>
  const files: File[] = []
  for (const k of Object.keys(meta)) {
    const b = (await get(`${idbKey}:${k}`)) as Blob | undefined
    if (b) {
      const m = meta[k]
      files.push(new File([b], m.name, { type: m.type, lastModified: m.lastModified }))
    }
  }
  return files
}

// Xóa từng file từ IDB, metadata ở localStorage
async function clearImagesFromIDB(idbKey: string) {
  const raw = localStorage.getItem(idbKey)
  if (raw) {
    const meta = JSON.parse(raw) as Record<string, unknown>
    await Promise.all(Object.keys(meta).map((k) => del(`${idbKey}:${k}`)))
  }
  localStorage.removeItem(idbKey)
}

export function useFormPersist<TForm extends FieldValues = FieldValues>(
  form: UseFormReturn<TForm>,
  opts?: Options<TForm>
): PersistApi {
  const { storageKeyBase = 'draft:form', partitionKey, includeKeys, excludeKeys } = opts || {}
  const { setValue, getValues } = form
  const jsonKey = useMemo(() => makeJsonKey(storageKeyBase, partitionKey), [storageKeyBase, partitionKey])
  const imgKey = useMemo(() => makeImgKey(storageKeyBase, partitionKey), [storageKeyBase, partitionKey])
  const [isRestored, setIsRestored] = useState(false)
  const queryParam = useQueryParam()

  // Khôi phục lúc mount - chỉ khi có query param draft=true
  useEffect(() => {
    const restoreForm = async () => {
      const isDraftMode = queryParam.draft === 'true'

      if (!isDraftMode) {
        setIsRestored(true)
        return
      }

      // Delay nhỏ để đảm bảo Controller đã mount
      await new Promise((resolve) => setTimeout(resolve, 50))

      // Lấy partitionKey đã lưu trước đó
      const lastPartitionKey = localStorage.getItem(`${storageKeyBase}:lastPartitionKey`)
      const actualPartitionKey = lastPartitionKey || partitionKey
      const actualJsonKey = makeJsonKey(storageKeyBase, actualPartitionKey)

      let raw = localStorage.getItem(actualJsonKey)

      // Nếu vẫn không tìm thấy, thử tìm với các partitionKey khác
      if (!raw) {
        const possibleKeys = [`${storageKeyBase}`, `${storageKeyBase}:vehicle`, `${storageKeyBase}:battery`]

        for (const key of possibleKeys) {
          raw = localStorage.getItem(key)
          if (raw) {
            break
          }
        }
      }

      if (raw) {
        const parsed = JSON.parse(raw) as { data: Partial<TForm> }
        const data = parsed?.data ?? {}

        // set từng field để không đè lên field không tồn tại
        Object.entries(data).forEach(([k, v]) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setValue(k as any, v as any, { shouldDirty: false, shouldValidate: false })
        })

        // Delay thêm để đảm bảo setValue hoàn thành
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      // Images
      const files = await loadImagesFromIDB(imgKey)
      if (files.length) {
        // cố gắng set vào 'images' & 'image' nếu có
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setValue('images' as any, files as any, { shouldDirty: false, shouldValidate: false })
        } catch {
          /* form không có field này cũng không sao */
        }
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setValue('image' as any, files[0] as any, { shouldDirty: false, shouldValidate: false })
        } catch {
          /* noop */
        }
      }
      setIsRestored(true)
    }

    restoreForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jsonKey, imgKey])

  // Không có autosave - chỉ lưu khi gọi saveNow()
  const saveNow = useCallback(async () => {
    const curr = getValues() as Record<string, unknown>
    const serializable = pickSerializable(
      curr,
      includeKeys as string[] | undefined,
      excludeKeys as string[] | undefined
    )

    // Lưu form data
    localStorage.setItem(jsonKey, JSON.stringify({ data: serializable, savedAt: Date.now() }))

    // Lưu partitionKey để biết key nào đã được sử dụng
    localStorage.setItem(`${storageKeyBase}:lastPartitionKey`, partitionKey || '')

    // Lưu images
    const imgs: File[] = []
    if (Array.isArray(curr.images) && curr.images.some(isFileLike)) {
      imgs.push(...(curr.images as File[]))
    }
    if (curr.image && isFileLike(curr.image)) {
      const cover = curr.image as File
      const exists = imgs.find((f) => imageKey(f) === imageKey(cover))
      if (!exists) imgs.unshift(cover)
    }

    if (imgs.length) {
      await saveImagesToIDB(imgKey, imgs)
    } else {
      await clearImagesFromIDB(imgKey)
    }
  }, [getValues, jsonKey, imgKey, includeKeys, excludeKeys, storageKeyBase, partitionKey])

  const clear = useCallback(async () => {
    await clearImagesFromIDB(imgKey)
    localStorage.removeItem(jsonKey)
    localStorage.removeItem(`${storageKeyBase}:lastPartitionKey`)
  }, [imgKey, jsonKey, storageKeyBase])

  return { saveNow, clear, isRestored }
}
