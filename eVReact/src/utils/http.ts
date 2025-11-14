import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { URL_LOGIN, URL_LOGOUT, URL_REGISTER, URL_UPDATE_PHONE } from '~/apis/auth.api'
import type { AuthResponse } from '~/types/auth.type'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string

  constructor() {
    this.instance = axios.create({
      // baseURL: '/api/',
      baseURL: 'https://electriccarmanagement-swp.up.railway.app/',
      timeout: 10 * 1000,
      headers: { 'Content-Type': 'application/json' }
    })
    this.accessToken = getAccessTokenFromLS()

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
        }
        const data = config.data
        if (data && typeof data === 'object' && !(data instanceof FormData)) {
          const hasFile = Object.values(data).some((value) => value instanceof File || value instanceof FileList)

          if (hasFile) {
            const formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
              if (value instanceof FileList) {
                if (value.length > 0) formData.append(key, value[0])
              } else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formData.append(key, value as any)
              }
            })

            config.data = formData
            if (config.headers) {
              config.headers['Content-Type'] = 'multipart/form-data'
            }
          }
        }

        return config
      },
      (error) => Promise.reject(error)
    )

    // ✅ Response Interceptor
    this.instance.interceptors.response.use(
      (response) => {
        if (
          response.config.url === URL_LOGIN ||
          response.config.url === URL_REGISTER ||
          response.config.url === URL_UPDATE_PHONE
        ) {
          setAccessTokenToLS((response.data as AuthResponse).data.access_token)
          this.accessToken = (response.data as AuthResponse).data.access_token
          setProfileToLS((response.data as AuthResponse).data.user)
        } else if (response.config.url === URL_LOGOUT) {
          clearLS()
          this.accessToken = ''
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          console.log(error)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
// (config) => {
//   // ---- Attach token (Axios v1 safe) ----
//   if (this.accessToken) {
//     console.log('token:', this.accessToken)
//     if (config.headers && typeof (config.headers as AxiosHeaders).set === 'function') {
//       ;(config.headers as AxiosHeaders).set('Authorization', this.accessToken)
//     } else {
//       config.headers = config.headers ?? {}
//       config.headers['Authorization'] = this.accessToken
//     }
//   }

//   // ---- Auto multipart nếu có File/FileList ----
//   const data = config.data
//   if (data && typeof data === 'object' && !(data instanceof FormData)) {
//     const hasFile = Object.values(data).some((v) => v instanceof File || v instanceof FileList)
//     if (hasFile) {
//       const formData = new FormData()
//       Object.entries(data).forEach(([k, v]) => {
//         if (v instanceof FileList) {
//           if (v.length > 0) formData.append(k, v[0])
//         } else {
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           formData.append(k, v as any)
//         }
//       })

//       config.data = formData
//       if (typeof (config.headers as AxiosHeaders)?.set === 'function') {
//         ;(config.headers as AxiosHeaders).set('Content-Type', 'multipart/form-data')
//       } else {
//         config.headers['Content-Type'] = 'multipart/form-data'
//       }
//     }
//   }

//   return config
// },
