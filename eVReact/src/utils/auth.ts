import type { User } from '~/types/user.type'

export const setAccessTokenToLS = (access_token: string) => localStorage.setItem('access_token', access_token)

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const setProfileToLS = (profile: User) => localStorage.setItem('profile', JSON.stringify(profile))

export const getProfileFromLS = () => {
  const profile = localStorage.getItem('profile')
  return profile ? JSON.parse(profile) : null
}

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}
