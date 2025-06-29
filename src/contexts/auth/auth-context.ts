import type { ProfessionalSignUpFormSchema } from '@/pages/auth/sign-up/professional/schema'
import { createContext } from 'react'
import type { LoginInput, User } from './auth-provider'

export type AuthContextData = {
  registerProfessional: (data: ProfessionalSignUpFormSchema) => Promise<void>
  login: (data: LoginInput) => Promise<void>
  isAuthenticated: boolean
  user: User | null
  signIn: (credencials: { email: string, password: string }) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined)
