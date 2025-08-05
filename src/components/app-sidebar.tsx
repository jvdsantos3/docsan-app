"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"
import { Logo } from "./logo"
import { NavMain } from "./sidebar/nav-main"
import { CircleIcon } from "lucide-react"

const data = {
  navMain: [
    {
      title: "Admninistração",
      icon: CircleIcon,
      isActive: true,
      items: [
        {
          title: "Áreas de atuação",
          url: "/admin/service-areas",
        }
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Sidebar  collapsible="icon" {...props}>
      <SidebarHeader className="bg-white">
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer hover:bg-transparent active:bg-transparent"
          onClick={toggleSidebar}
        >
          <div className="flex aspect-square  items-center justify-center rounded-lg">
            <Logo className="w-25" />
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
