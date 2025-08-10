import type { ProfessionalSignUpFormSchema } from '@/pages/auth/sign-up/professional/schema'
import { createContext } from 'react'
import type { LoginInput } from './auth-provider'
import type { User } from '@/types/user'

export type AuthContextData = {
  registerProfessional: (data: ProfessionalSignUpFormSchema) => Promise<void>
  login: (data: LoginInput) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
  token?: string | null
  user?: User | null
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined)
