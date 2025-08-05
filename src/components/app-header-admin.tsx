import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Button, buttonVariants } from './ui/button'
import { Link } from 'react-router-dom'
import { Logo } from './logo'
import { useAuth } from '@/hooks/use-auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSidebar } from './ui/sidebar'

export const AppHeaderAdmin = () => {
  const { isAuthenticated } = useAuth()
  const { toggleSidebar } = useSidebar()

  return (
    <header className="border-b bg-white sticky top-0 z-50 w-full px-[7.5rem]">
      <div className="flex h-16 items-center justify-between gap-4 px-4 xl:px-0 container mx-auto">
        <Button
          variant="ghost"
          onClick={toggleSidebar}
        >
          <Logo />
        </Button>

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
                  <DropdownMenuItem asChild>
                    <Link to="/document-types">Meus tipos de documentos</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}