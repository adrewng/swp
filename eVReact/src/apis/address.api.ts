import axios from 'axios'

export interface Province {
  code: number
  name: string
}

export interface Ward {
  code: number
  name: string
}

// Using a free API service for Vietnam addresses
const API_BASE_URL = 'http://provinces.open-api.vn/api/v2'

// API Response interfaces
interface ApiProvince {
  code: number
  name: string
}

interface ApiWard {
  code: number
  name: string
  division_type: string
  codename: string
  province_code: number
}

interface ApiProvinceResponse {
  name: string
  code: number
  division_type: string
  codename: string
  phone_code: number
  wards: ApiWard[]
}

export const addressApi = {
  // Get all provinces
  getProvinces: async (): Promise<Province[]> => {
    try {
      const response = await axios.get<ApiProvince[]>(`${API_BASE_URL}/p/`)
      return response.data.map((item: ApiProvince) => ({
        code: item.code,
        name: item.name
      }))
    } catch {
      return []
    }
  },

  // Get wards by province code
  getWardsByProvince: async (provinceCode: number): Promise<Ward[]> => {
    try {
      const response = await axios.get<ApiProvinceResponse>(`${API_BASE_URL}/p/${provinceCode}?depth=2`)
      const districts =
        response.data.wards?.map((item: ApiWard) => ({
          code: item.code,
          name: item.name
        })) || []
      return districts
    } catch {
      return []
    }
  }
}
