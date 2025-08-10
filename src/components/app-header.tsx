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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { SignUpSelectorDialog } from './dialogs/sign-up-selector-dialog'
import { useState } from 'react'
import { LogOut } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'

export const AppHeader = () => {
  const { isAuthenticated, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [openSignOutDialog, setOpenSignOutDialog] = useState(false)

  const navigationLinks = [
    {
      href: '/documents',
      label: 'Documentos',
      active: true,
      hidden: !isAuthenticated,
    },
    {
      href: '/services',
      label: 'Serviços',
      active: true,
      hidden: !isAuthenticated,
    },
    {
      href: '/courses',
      label: 'Cursos',
      active: true,
      hidden: !isAuthenticated,
    },
    // { href: '#', label: 'Cadastre-se', active: true, hidden: isAuthenticated },
  ]

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
                return link.hidden ? null : (
                  <NavigationMenuItem key={i}>
                    <NavigationMenuLink
                      active={link.active}
                      className="font-bold text-base text-blue-900"
                      asChild
                    >
                      <Link to={link.href}>{link.label}</Link>
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

      <Dialog open={openSignOutDialog} onOpenChange={setOpenSignOutDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Tem certeza de que deseja sair?</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={logout}>Sair</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
