import { useCallback, useEffect, useState } from 'react'
import { addressApi } from '~/apis/address.api'

export interface Province {
  code: number
  name: string
}

export interface Ward {
  code: number
  name: string
}

export const useAddress = () => {
  const [provinces, setProvinces] = useState<Province[]>([])
  const [wards, setWards] = useState<Ward[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load provinces on mount
  useEffect(() => {
    const loadProvinces = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await addressApi.getProvinces()
        setProvinces(data)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        setError('Không thể tải danh sách tỉnh/thành phố')
      } finally {
        setLoading(false)
      }
    }
    loadProvinces()
  }, [])

  const loadWards = useCallback(async (provinceCode: number) => {
    if (!provinceCode) {
      setWards([])
      return
    }
    setLoading(true)
    setError(null)
    try {
      const data = await addressApi.getWardsByProvince(provinceCode)
      setWards(data) // Reset wards when province changes
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setError('Không thể tải danh sách phường/xã')
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    provinces,
    wards,
    loading,
    error,
    loadWards
  }
}
