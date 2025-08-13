import { type PropsWithChildren } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import type { Role } from './types/user'
import { useAuth } from './hooks/use-auth'

type RoleProtectedLayoutProps = PropsWithChildren & {
  allowedRoles?: Role[]
}

export const RoleProtectedLayout = ({
  allowedRoles,
}: RoleProtectedLayoutProps) => {
  const { user } = useAuth()
  const navigate = useNavigate()

  if (user === undefined) {
    return <>Carregando...</>
  }

  if (user === null || (allowedRoles && !allowedRoles.includes(user.role))) {
    return <>Acesso negado</>
  }

  return <Outlet />
}
