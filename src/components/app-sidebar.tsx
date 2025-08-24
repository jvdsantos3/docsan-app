import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar'
import { Logo } from './logo'
import { NavMain } from './sidebar/nav-main'
import { Settings, Users } from 'lucide-react'
import { SimpleLogo } from './simple-logo'

const data = {
  navMain: [
    {
      title: 'Admninistração',
      icon: Settings,
      isActive: true,
      items: [
        {
          title: 'CNAEs',
          url: '/admin/cnae',
        },
        {
          title: 'Ramos de atuação',
          url: '/admin/branches-activity',
        },
        {
          title: 'Tipos de registro',
          url: '/admin/registry-types',
        },
        {
          title: 'Leads',
          url: '/admin/leads',
        },
      ],
    },
    {
      title: 'Usuários',
      icon: Users,
      isActive: true,
      items: [
        {
          title: 'Profissionais',
          url: '/admin/professionals',
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar, state } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-white">
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer hover:bg-transparent active:bg-transparent"
          onClick={toggleSidebar}
        >
          <div className="flex aspect-square items-center justify-center rounded-lg">
            {state === 'collapsed' ? (
              <SimpleLogo className="w-8" />
            ) : (
              <Logo className="w-25" />
            )}
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
