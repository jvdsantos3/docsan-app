import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { buttonVariants } from './ui/button'
import { Link } from 'react-router-dom'
import { Logo } from './logo'

const navigationLinks = [
  { href: '/services', label: 'Serviços', active: true },
  { href: '/courses', label: 'Cursos', active: true },
  { href: '#', label: 'Cadastre-se', active: true },
]

export const AppHeader = () => {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center justify-between gap-4 px-4 xl:px-0 container mx-auto">
        <Link to="/">
          <Logo />
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            {navigationLinks.map((link, i) => (
              <NavigationMenuItem key={i}>
                <NavigationMenuLink
                  active={link.active}
                  href={link.href}
                  className="font-lato font-bold text-base text-blue-900"
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
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
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}
