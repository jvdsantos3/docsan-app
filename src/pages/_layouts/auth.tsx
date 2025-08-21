import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { getRedirectPathByRole } from '@/utils/auth'

export const AuthLayout = () => {
  const { user } = useAuth()

  if (user) {
    return <Navigate to={getRedirectPathByRole(user.role)} replace />
  }

  return (
    <main className="min-h-screen bg-[url(/background-image.png)] bg-repeat flex justify-center items-center">
      <Outlet />
    </main>
  )
}
