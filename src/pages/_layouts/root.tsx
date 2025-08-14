import { AppFooter } from '@/components/app-footer'
import { AppHeader } from '@/components/layout/app-header'
import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <div className="flex flex-col w-full min-h-svh">
      <AppHeader />

      <main className="min-h-[calc(100vh-64px)]">
        <div className="container mx-auto px-4 lg:px-0">
          <Outlet />
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
