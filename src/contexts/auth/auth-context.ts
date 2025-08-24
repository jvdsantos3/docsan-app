import { createContext } from 'react'
import type { LoginInput } from './auth-provider'
import type { User } from '@/types/user'

export type AuthContextData = {
  login: (data: LoginInput) => Promise<void>
  loginGoogle: (access_token: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
  token?: string | null
  user?: User | null
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined)
