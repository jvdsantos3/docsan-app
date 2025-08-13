import { useEffect } from 'react'
import { useAuth } from './hooks/use-auth'
import { Outlet, useNavigate } from 'react-router-dom'

export const ProtectedLayout = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user === null) {
      navigate('/sign-in', { replace: true })
    }
  }, [navigate, user])

  return <Outlet />
}
