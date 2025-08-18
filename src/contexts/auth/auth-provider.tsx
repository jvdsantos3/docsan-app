import { useEffect, useState, type PropsWithChildren } from 'react'
import { AuthContext } from './auth-context'
import type { ProfessionalSignUpFormSchema } from '@/pages/auth/sign-up/professional/schema'
import { api } from '@/lib/axios'
import { useNavigate } from 'react-router-dom'
import { getToken, removeTokens, storeTokens } from '@/utils/sessionMethods'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'sonner'
import type { Role, User } from '@/types/user'
import { useProfile } from '@/http/use-profile'

export type AuthProviderProps = PropsWithChildren

export type AccessTokenPayload = {
  sub: string
  role: Role
  iat: number
  exp: number
  type: 'access'
}

export interface LoginInput {
  email: string
  password: string
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate()
  const [authUser, setAuthUser] = useState<User | null>()
  const [token, setToken] = useState<string | null>(getToken())
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { data: profileData, isLoading: isLoadingProfile } = useProfile({
    enabled: !!token,
  })

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

  // function isTokenExpired(token: string): boolean {
  //   const payload: AccessTokenPayload = jwtDecode(token)
  //   const currentTime = Math.floor(Date.now() / 1000)
  //   return payload.exp < currentTime
  // }

  async function login(data: LoginInput) {
    await api
      .post('/sessions', data)
      .then((res) => {
        const accessToken = res.data.access_token

        storeTokens(accessToken)
        setToken(accessToken)

        const payload: Pick<AccessTokenPayload, 'sub' | 'role'> =
          jwtDecode(accessToken)

        setIsAuthenticated(true)

        toast.dismiss()

        if (payload.role === 'ADMIN') {
          navigate('/admin/cnae')
        } else if (payload.role === 'PROFESSIONAL') {
          navigate('/services')
        } else {
          navigate('/documents')
        }
      })
      .catch((err) => {
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

  async function loginGoogle(access_token: string) {
    await api
      .post('/sessions/google', { token: access_token })
      .then((res) => {
        const accessToken = res.data.access_token

        storeTokens(accessToken)
        setToken(accessToken)

        const payload: Pick<AccessTokenPayload, 'sub' | 'role'> =
          jwtDecode(accessToken)

        setIsAuthenticated(true)

        toast.dismiss()

        if (payload.role === 'ADMIN') {
          navigate('/admin/cnae')
        } else if (payload.role === 'PROFESSIONAL') {
          navigate('/services')
        } else {
          navigate('/documents')
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          let message = ''
          let description = ''

          switch (err.response.data.error) {
            case 'Unauthorized':
              message = 'Usuário não localizado'
              description =
                'Para realizar o acesso é necessário realizar o cadastro.'
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

  async function logout() {
    await api.delete('/sessions')

    removeTokens()
    setIsAuthenticated(false)
    setAuthUser(null)
    setToken(null)
    navigate('/sign-in', { replace: true })
  }

  useEffect(() => {
    if (profileData) {
      setAuthUser({
        ...profileData.user,
      })
      setIsAuthenticated(true)
    }

    if (!profileData && !isLoadingProfile) {
      setAuthUser(null)
      setIsAuthenticated(false)
    }
  }, [isLoadingProfile, profileData])

  return (
    <AuthContext.Provider
      value={{
        registerProfessional,
        login,
        loginGoogle,
        logout,
        isAuthenticated,
        user: authUser,
        token: token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
