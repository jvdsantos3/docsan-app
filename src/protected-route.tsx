import {
  // useEffect,
  type PropsWithChildren,
} from 'react'
import type { Role } from './types/user'
import { useAuth } from './hooks/use-auth'
// import { useNavigate } from 'react-router-dom'

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: Role[]
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const { user } = useAuth()
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (user === null) {
  //     navigate('/sign-in', { replace: true })
  //   }
  // }, [navigate, user])

  if (user === undefined) {
    return <>Carregando...</>
  }

  if (user === null || (allowedRoles && !allowedRoles.includes(user.role))) {
    return <>Acesso negado</>
  }

  return children
}
