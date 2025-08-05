import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { buttonVariants } from './ui/button'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export const AppHeaderAdmin = () => {
  const { isAuthenticated } = useAuth()

  return (
    <header className="border-b bg-white flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex h-16 items-center justify-end gap-4 container mx-auto">
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