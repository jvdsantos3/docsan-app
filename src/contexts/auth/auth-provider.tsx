import { useState } from 'react'
import { AuthContext } from './auth-context'

export type AuthProviderProps = {
  children: React.ReactNode
}

const mockupAuthUser = {
  id: '0c2f4a74-ccd5-4579-a456-07e9431929c1',
  name: 'John Doe',
  email: 'johndoe@email.com',
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authUser, setAuthUser] = useState<typeof mockupAuthUser | null>(
    mockupAuthUser,
  )

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: true,
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
