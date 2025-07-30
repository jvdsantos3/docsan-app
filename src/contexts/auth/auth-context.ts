import type { ProfessionalSignUpFormSchema } from '@/pages/auth/sign-up/professional/schema'
import { createContext } from 'react'
import type { LoginInput } from './auth-provider'
import type { User } from '@/types/user'

export type AuthContextData = {
  registerProfessional: (data: ProfessionalSignUpFormSchema) => Promise<void>
  login: (data: LoginInput) => Promise<void>
  isAuthenticated: boolean
  token?: string | null
  user?: User | null
  signIn: (credencials: { email: string; password: string }) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined)
