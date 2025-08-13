import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { buttonVariants } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Logo } from '@/components/logo'
import { useAuth } from '@/hooks/use-auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SignUpSelectorDialog } from '@/components/dialogs/sign-up-selector-dialog'
import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { SignOutDialog } from '@/components/dialogs/sign-out-dialog'
import type { Role } from '@/types/user'
import { AppHeaderSkeleton } from './app-header-skeleton'

type NavigationLinkProps = {
  path: string
  label: string
  active?: boolean
  hidden?: boolean
  allowedRoles?: Role[]
}

export const AppHeader = () => {
  const { isAuthenticated, user } = useAuth()
  const [open, setOpen] = useState(false)
  const [openSignOutDialog, setOpenSignOutDialog] = useState(false)

  const navigationLinks: NavigationLinkProps[] = [
    {
      path: '/documents',
      label: 'Documentos',
      hidden: !isAuthenticated,
    },
    {
      path: '/services',
      label: 'Serviços',
      hidden: !isAuthenticated,
    },
    {
      path: '/courses',
      label: 'Cursos',
      hidden: !isAuthenticated,
    },
  ]

  if (user === undefined) {
    return <AppHeaderSkeleton />
  }

  return (
    <>
      <header className="border-b bg-white sticky top-0 z-50 w-full">
        <div className="flex h-16 items-center justify-between gap-4 px-4 xl:px-0 container mx-auto">
          <Link to="/">
            <Logo />
          </Link>

          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link, i) => {
                return link.hidden ||
                  (user &&
                    link.allowedRoles &&
                    link.allowedRoles.includes(user.role)) ? null : (
                  <NavigationMenuItem key={i}>
                    <NavigationMenuLink
                      active={link.active}
                      className="font-bold text-base text-blue-900"
                      asChild
                    >
                      <Link to={link.path}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              })}
              {!isAuthenticated && (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="font-bold text-base text-blue-900 cursor-pointer"
                      onClick={() => setOpen(true)}
                    >
                      Cadastre-se
                    </NavigationMenuLink>
                  </NavigationMenuItem>
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
                </>
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
                    <DropdownMenuSeparator />
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

      <SignUpSelectorDialog open={open} onOpenChange={setOpen} />

      <SignOutDialog
        open={openSignOutDialog}
        onOpenChange={setOpenSignOutDialog}
      />
    </>
  )
}
