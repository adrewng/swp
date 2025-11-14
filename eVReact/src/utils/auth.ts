import type { User } from '~/types/user.type'

export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (access_token: string) => localStorage.setItem('access_token', access_token)

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}
export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''

export const getProfileFromLS = () => {
  const profile = localStorage.getItem('profile')
  return profile ? JSON.parse(profile) : null
}
export const setProfileToLS = (profile: User) => localStorage.setItem('profile', JSON.stringify(profile))

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

/**
 * Xóa tất cả React Query cache từ localStorage
 * Bao gồm cả persister cache
 */
export const clearReactQueryCache = () => {
  // Xóa tất cả keys liên quan đến React Query persister
  const persistKeys = Object.keys(localStorage).filter(
    (key) => key.startsWith('REACT_QUERY_OFFLINE_CACHE') || key.startsWith('tanstack')
  )
  persistKeys.forEach((key) => localStorage.removeItem(key))
}
