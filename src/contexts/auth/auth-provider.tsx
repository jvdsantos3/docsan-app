import { useState } from 'react'
import { AuthContext } from './auth-context'
import type { ProfessionalSignUpFormSchema } from '@/pages/auth/sign-up/professional/schema'
import { api } from '@/lib/axios'
import { useNavigate } from 'react-router-dom'
import { getToken, storeTokens } from '@/utils/sessionMethods'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'sonner'

export type AuthProviderProps = {
  children: React.ReactNode
}

export interface User {
  id: string
  role: 'professional' | 'company'
}

export interface LoginInput {
  email: string
  password: string
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken())
  const [authUser, setAuthUser] = useState<User | null>(null)

  const navigate = useNavigate()

  async function registerProfessional(data: ProfessionalSignUpFormSchema) {
    await api
      .post('/professionals', data)
      .then(() => {
        navigate('/sign-in')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function login(data: LoginInput) {
    await api
      .post('/sessions', data)
      .then((res) => {
        const accessToken = res.data.access_token

        storeTokens(res.data.access_token)

        const user: { sub: string; role: 'professional' | 'company' } =
          jwtDecode(accessToken)

        setAuthUser({
          id: user.sub,
          role: user.role,
        })

        setIsAuthenticated(true)
        toast.dismiss()
        navigate(user.role === 'professional' ? '/services' : '/documents')
      })
      .catch((err) => {
        console.error(err)
        if (err.response?.status === 401) {
          let message = ''
          let description = ''

          switch (err.response.data.error) {
            case 'Unauthorized':
              message = 'E-mail ou senha inválidos.'
              description = 'Verifique suas credenciais e tente novamente.'
              break
          }

          toast.error(message, {
            position: 'top-center',
            duration: 3000,
            description,
            richColors: true,
          })
          return
        }

        if (err.response?.status >= 500) {
          toast.error('Erro interno do servidor.', {
            position: 'top-center',
            duration: 3000,
            description: 'Parece que houve um erro ao tentar fazer login.',
            richColors: true,
          })
          return
        }

        toast.error('Erro desconhecido.', {
          position: 'top-center',
          duration: 3000,
          description: 'Parece que estamos enfrentando um problema.',
          richColors: true,
        })
        return
      })
  }

  return (
    <AuthContext.Provider
      value={{
        registerProfessional,
        login,
        isAuthenticated,
        user: authUser,

        signIn: (credencials) => {
          console.log(credencials)
        },
        signOut: () => {
          setAuthUser(null)
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
