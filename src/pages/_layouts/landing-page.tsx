import { AppFooter } from '@/components/app-footer'
import { AppHeader } from '@/components/app-header'
import { Outlet } from 'react-router-dom'

export const LandingPageLayout = () => {
  return (
    <div className="w-full">
      <AppHeader />

      <div className="container mx-auto px-4">
        <Outlet />
      </div>

      <AppFooter />
    </div>
  )
}
