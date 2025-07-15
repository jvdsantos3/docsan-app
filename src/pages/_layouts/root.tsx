import { AppFooter } from '@/components/app-footer'
import { AppHeader } from '@/components/app-header'
import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <div className="flex flex-col w-full min-h-svh">
      <AppHeader />

      <main className="flex flex-1 flex-col">
        <div className="container mx-auto px-4 xl:px-0">
          <Outlet />
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
