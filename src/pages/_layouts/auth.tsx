import { Outlet } from 'react-router-dom'
// import { useAuth } from '@/hooks/use-auth'
// import { useEffect } from 'react'

export const AuthLayout = () => {
  // const navigate = useNavigate()
  // const { isAuthenticated, user } = useAuth()

  // useEffect(() => {
  //   if (isAuthenticated && user) {
  //     let navigateTo = ''

  //     if (user.role === 'ADMIN') {
  //       navigateTo = '/admin/cnae'
  //     } else if (user.role === 'OWNER') {
  //       navigateTo = '/services'
  //     } else {
  //       navigateTo = '/documents'
  //     }

  //     navigate(navigateTo, { replace: true })
  //   }
  // }, [isAuthenticated, user, navigate])

  return (
    <main className="min-h-screen bg-[url(/background-image.png)] bg-repeat flex justify-center items-center">
      <Outlet />
    </main>
  )
}
