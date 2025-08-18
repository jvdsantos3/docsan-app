import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Button, buttonVariants } from './ui/button'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSidebar } from './ui/sidebar'
import { SimpleLogo } from './simple-logo'
import { SignOutDialog } from './dialogs/sign-out-dialog'
import { useState } from 'react'
import { LogOut } from 'lucide-react'

export const AppHeaderAdmin = () => {
  const { isAuthenticated } = useAuth()
  const { toggleSidebar } = useSidebar()
  const [openSignOutDialog, setOpenSignOutDialog] = useState(false)

  return (
    <>
      <header className="border-b w-auto bg-white flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex h-16 items-center justify-between gap-4 px-4 xl:px-0 container mx-auto">
          <div>
            <Button
              variant="ghost"
              className="sm:hidden"
              onClick={toggleSidebar}
            >
              <SimpleLogo className="w-8" />
            </Button>
          </div>
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {!isAuthenticated && (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to={'/sign-in'}
                      className={buttonVariants({ variant: 'default' })}
                    >
                      Login
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
              {isAuthenticated && (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="border border-gray-100">
                      <AvatarImage src="logo-03.svg" alt="Profile image" />
                      <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="hover:text-red-500!"
                      onClick={() => setOpenSignOutDialog(true)}
                    >
                      <LogOut className="hover:text-red-500!" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <SignOutDialog
        open={openSignOutDialog}
        onOpenChange={setOpenSignOutDialog}
      />
    </>
  )
}
