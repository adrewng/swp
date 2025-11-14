import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER, URL_UPDATE_PHONE } from '~/apis/auth.api'
import type { AuthResponse, RefreshTokenReponse } from '~/types/auth.type'
import type { ErrorResponse } from '~/types/util.type'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './auth'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './util'

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null

  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      // baseURL: '/api/',
      // baseURL: 'https://electriccarmanagement-swp.up.railway.app/',
      // baseURL: 'http://localhost:3000/',
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 20 * 1000,
      headers: { 'Content-Type': 'application/json' }
    })
    this.instance.interceptors.request.use(
      (config) => {
        // auth
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
        }

        const data = config.data

        // chỉ xử lý khi data là object "phẳng" người dùng gửi lên
        if (data && typeof data === 'object' && !(data instanceof FormData)) {
          // có chứa bất kỳ File / FileList / File[] không?
          const hasBinary = Object.values(data).some(
            (v) =>
              v instanceof File ||
              v instanceof Blob ||
              v instanceof FileList ||
              (Array.isArray(v) && v.length && v.every((x) => x instanceof File || x instanceof Blob))
          )

          if (hasBinary) {
            const fd = new FormData()

            Object.entries(data).forEach(([key, value]) => {
              if (value == null) return // bỏ qua null/undefined

              // 1) File đơn
              if (value instanceof File || value instanceof Blob) {
                fd.append(key, value as File, (value as File).name ?? 'blob')
                return
              }

              // 2) FileList
              if (value instanceof FileList) {
                Array.from(value).forEach((f) => fd.append(key, f, f.name))
                return
              }

              // 3) Mảng File[]
              if (Array.isArray(value) && value.every((x) => x instanceof File || x instanceof Blob)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ;(value as (File | Blob)[]).forEach((f: any) => fd.append(key, f, (f as File).name ?? 'blob'))
                return
              }

              // 4) Primitive / object thường
              //  - number/boolean/string -> toString
              //  - object khác -> stringify
              if (typeof value === 'object') {
                fd.append(key, JSON.stringify(value))
              } else {
                fd.append(key, String(value))
              }
            })

            config.data = fd
            if (config.headers) {
              delete config.headers['Content-Type']
            }
          }
        }

        return config
      },
      (error) => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      (response) => {
        if (
          response.config.url === URL_LOGIN ||
          response.config.url === URL_REGISTER ||
          response.config.url === URL_UPDATE_PHONE
        ) {
          setAccessTokenToLS((response.data as AuthResponse).data.access_token)
          this.accessToken = (response.data as AuthResponse).data.access_token
          this.refreshToken = (response.data as AuthResponse).data.refresh_token
          setRefreshTokenToLS((response.data as AuthResponse).data.refresh_token)
          setProfileToLS((response.data as AuthResponse).data.user)
        } else if (response.config.url === URL_LOGOUT) {
          clearLS()
          this.accessToken = ''
          this.refreshToken = ''
        }
        return response
      },
      (error: AxiosError) => {
        // Toast khi không phải lỗi 422 và 401
        if (
          ![
            HttpStatusCode.UnprocessableEntity,
            HttpStatusCode.Unauthorized,
            HttpStatusCode.NotFound,
            HttpStatusCode.Forbidden
          ].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }

        // Lỗi Unauthorized (401) có rất nhiều trường hợp
        // - Token không đúng
        // - Không truyền token
        // - Token hết hạn

        // Nếu là lỗi 401 thì xử lý tại đây
        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || { headers: {}, url: '' }
          const { url } = config
          //Xữ lý những lỗi liên quan đến token hết hạn
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            //Hạn chế gọi 2 lần handleRefreshToken
            this.refreshTokenRequest = this.refreshTokenRequest //
              ? this.refreshTokenRequest
              : this.handleRefreshToken()
            // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
            setTimeout(() => {
              this.refreshTokenRequest = null
            }, 10000)
            return this.refreshTokenRequest.then((access_token) => {
              //Tiếp tục gọi lại các request đã bị 401 với token mới
              return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
            })
          }
          // Còn những trường hợp như token không đúng
          // không truyền token,
          // token hết hạn nhưng gọi refresh token bị fail
          // thì tiến hành xóa local storage và toast message
          clearLS()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(error.response?.data.data?.message || error.response?.data.message)
        }
        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenReponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessTokenToLS(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((err) => {
        clearLS()
        this.accessToken = ''
        this.refreshToken = ''
        throw err
      })
  }
}

const http = new Http().instance
export default http
