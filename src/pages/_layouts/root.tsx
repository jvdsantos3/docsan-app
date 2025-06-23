import { AppHeader } from '@/components/app-header'
import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <div>
      <AppHeader />
      <div className="container mx-auto px-4 py-8">
        <Outlet />
      </div>
      footer
    </div>
  )
}
