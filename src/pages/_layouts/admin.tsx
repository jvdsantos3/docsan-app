import { AppFooter } from '@/components/app-footer'
import { AppHeaderAdmin } from '@/components/app-header-admin'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

export const AdminLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeaderAdmin />
        <div className="flex flex-1 flex-col">
            <main className="flex flex-1 flex-col min-h-[calc(100vh-64px)] px-[7.5rem]">
              <div className="container mx-auto px-[7.5rem] xl:px-0">
                <Outlet />
              </div>
            </main>
            <AppFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
