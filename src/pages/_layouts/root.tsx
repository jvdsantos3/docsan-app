import { AppFooter } from '@/components/app-footer'
import { AppHeader } from '@/components/app-header'
import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <div className="flex flex-col w-full min-h-svh">
      <AppHeader />

      <main className="flex flex-1 flex-col min-h-[calc(100vh-64px)] px-[7.5rem]">
        <div className="container mx-auto px-[7.5rem] xl:px-0">
          <Outlet />
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
