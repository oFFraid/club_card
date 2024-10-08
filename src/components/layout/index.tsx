import { Link, LinkProps } from '@tanstack/react-router'
import { Menu, User } from 'lucide-react'
import { FC, PropsWithChildren, useMemo } from 'react'

import logoImage from '@/assets/images/t1-flag.png'
import { Button } from '@/components/ui/button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet.tsx'
import { useLogoutMutation } from '@/store/api/auth-slice.ts'
import { useProfileQuery } from '@/store/api/profile-slice.ts'
import { RoleResponse } from '@/types/members.ts'
import { cn } from '@/utils'

const menuLinks: {
  link: LinkProps['to']
  label: string
  roles: RoleResponse[]
}[] = [
  { link: '/cards', label: 'Карты', roles: ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_USER'] },
  { link: '/card-templates', label: 'Шаблоны карт', roles: ['ROLE_SUPERUSER', 'ROLE_ADMIN'] },
  { link: '/users', label: 'Пользователи', roles: ['ROLE_SUPERUSER', 'ROLE_ADMIN'] },
]

const LogoLink: FC<
  LinkProps & {
    className?: string
  }
> = ({ className, ...props }) => {
  return (
    <Link
      to='/'
      activeOptions={{
        exact: false,
      }}
      className={cn('w-[55px] h-[60px]', className)}
      {...props}>
      <img
        src={logoImage}
        className='h-full w-full'
        alt='logo'
      />
      <span className='sr-only'>Logo image</span>
    </Link>
  )
}

const MiniUserProfile = () => {
  const profileQuery = useProfileQuery()
  const [logout] = useLogoutMutation()

  const handleLogout = () => logout()

  return (
    <div className='flex gap-3 items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='rounded-full p-1'>
            <User className='h-full w-full' />
            <span className='sr-only'>Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to='/profile'>Профиль</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>Выход</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className='text-sm flex flex-col items-start'>
        <span>{profileQuery.data?.firstName}</span> <span>{profileQuery.data?.lastName}</span>
      </div>
    </div>
  )
}

const Header = () => {
  const profileQuery = useProfileQuery()

  const menuItems = useMemo(
    () =>
      menuLinks.map((item) => {
        if (!item.roles?.find((e) => e === profileQuery.data?.role)) {
          return null
        }

        return (
          <Link
            // activeOptions={{
            //   exact: true,
            // }}
            className='text-sm md:text-md text-gray-400 duration-200 hover:text-slate-900 uppercase font-bold text-foreground transition-colors hover:text-foreground'
            activeProps={{
              className: 'text-slate-900',
            }}
            to={item.link}
            key={item.label}>
            <span>{item.label}</span>
          </Link>
        )
      }),
    [profileQuery.data?.role],
  )

  return (
    <header className='sticky top-0 flex border-b-1 border-x-0 border-t-0 border-solid border-primary items-center gap-4 bg-card py-3 px-4 md:px-6 z-10'>
      <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
        <LogoLink />
        {menuItems}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <nav className='grid gap-6 text-lg font-medium'>
            <LogoLink className='w-[25px] h-[30px]' />
            {menuItems}
          </nav>
        </SheetContent>
      </Sheet>

      <div className='ml-auto'>
        <MiniUserProfile />
      </div>
    </header>
  )
}

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>{children}</main>
    </div>
  )
}

export default Layout
