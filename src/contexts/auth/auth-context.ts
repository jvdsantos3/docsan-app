import { createContext } from 'react'

export type AuthContextData = {
  isAuthenticated: boolean
  user: {
    id: string
    name: string
    email: string
  } | null
  signIn: (credencials: { email: string, password: string }) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined)
