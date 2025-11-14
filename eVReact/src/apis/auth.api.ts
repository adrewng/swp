import type { AuthResponse } from '~/types/auth.type'
import http from '~/utils/http'

export const URL_LOGIN = 'api/user/login'
export const URL_REGISTER = 'api/user/register'
export const URL_LOGOUT = 'api/user/logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'
export const URL_UPDATE_PHONE = 'api/user/update-phone'

export const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_REGISTER, body)
  },
  loginAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body)
  },
  logout() {
    return http.post(URL_LOGOUT)
  },
  updatePhone(phone: string) {
    return http.put(URL_UPDATE_PHONE, { phone })
  }
}
