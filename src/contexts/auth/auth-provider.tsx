import { useEffect, useState, type PropsWithChildren } from 'react'
import { AuthContext } from './auth-context'
import type { ProfessionalSignUpFormSchema } from '@/pages/auth/sign-up/professional/schema'
import { api } from '@/lib/axios'
import { useNavigate } from 'react-router-dom'
import { getToken, removeTokens, storeTokens } from '@/utils/sessionMethods'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'sonner'
import type { Role, User } from '@/types/user'
import type { GetProfileResponse } from '@/types/http/get-profile-response'

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
  const [user, setUser] = useState<User | null>()
  const [token, setToken] = useState<string | null>(getToken())
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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

  async function login({ email, password }: LoginInput) {
    const response = await api.post<{ access_token: string }>('/sessions', {
      email,
      password,
    })
    const {
      data: { access_token },
    } = response

    storeTokens(access_token)
    setToken(access_token)
    setIsAuthenticated(true)

    const {
      data: { user },
    } = await api.get<GetProfileResponse>('/profile')
    setUser(user)
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
    setUser(null)
    setToken(null)
  }

  useEffect(() => {
    const token = getToken()

    const getProfile = async () => {
      const { data } = await api.get<GetProfileResponse>('/profile')
      setUser(data.user)
      setIsAuthenticated(true)
    }

    if (token) {
      getProfile()
    } else {
      setUser(null)
      setIsAuthenticated(false)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        registerProfessional,
        login,
        loginGoogle,
        logout,
        isAuthenticated,
        user,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
