import { useAuth } from './hooks/use-auth'
import { Navigate, Outlet } from 'react-router-dom'
import type { Role } from './types/user'
import { Loader2 } from 'lucide-react'

type ProtectedLayoutProps = {
  allowedRoles?: Role[]
}

export const ProtectedLayout = ({ allowedRoles }: ProtectedLayoutProps) => {
  const { isAuthenticated, user } = useAuth()

  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-blue-source" />
        Carregando...
      </div>
    )
  }

  if (user === null || !isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <>Acesso negado</>
  }

  return <Outlet />
}
