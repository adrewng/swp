import { createContext, useState } from 'react'
import type { User } from '~/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from '~/utils/auth'
interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const getInitialAppContext: () => AppContextInterface = () => {
  return {
    isAuthenticated: Boolean(getAccessTokenFromLS()),
    setIsAuthenticated: () => null,
    profile: getProfileFromLS(),
    setProfile: () => null
  }
}
const initialAppContext = getInitialAppContext()

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextInterface>(initialAppContext)
export default function AppProvider({
  children,
  defaultValue = initialAppContext
}: {
  children: React.ReactNode
  defaultValue?: AppContextInterface
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultValue.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(defaultValue.profile)

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}>
      {children}
    </AppContext.Provider>
  )
}
