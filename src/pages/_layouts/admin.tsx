import { AppFooter } from '@/components/app-footer'
import { AppHeaderAdmin } from '@/components/app-header-admin'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

export const AdminLayout = () => {
  return (
    <SidebarProvider className="flex flex-col w-full min-h-svh [--header-height:calc(--spacing(14))]">
      <AppHeaderAdmin />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <main className="flex flex-1 flex-col min-h-[calc(100vh-64px)] px-[7.5rem]">
            <div className="container mx-auto px-[7.5rem] xl:px-0">
              <Outlet />
            </div>
          </main>
          <AppFooter />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
