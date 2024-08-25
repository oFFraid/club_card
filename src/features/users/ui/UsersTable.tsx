import { Link } from '@tanstack/react-router'
import { EditIcon } from 'lucide-react'
import { FC } from 'react'

import {
  Button,
  ButtonProps,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { Badge } from '@/components/ui/badge.tsx'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination.tsx'
import Spinner from '@/components/ui/spinner.tsx'
import { PaginationParams, usePagination } from '@/hooks/use-pagination.ts'

const users = new Array(10).fill(0).map((_, i) => ({
  id: i,
  firstName: 'Test',
  lastName: 'Ivanov',
  birthDate: '29.02.2031',
  email: 'test@test.com',
  privilegeLevel: 'VIP',
  role: 'Администратор',
}))

const TablePagination: FC<
  {
    pagination: PaginationParams
  } & Pick<ButtonProps, 'size'>
> = ({ pagination, size = 'sm' }) => {
  const p = usePagination({ ...pagination, total: users.length, initialPage: 1 })

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            size={size}
            className='cursor-pointer select-none'
            search={{
              page: p.active > 1 ? p.active - 1 : p.active,
            }}
          />
        </PaginationItem>

        {p.range.map((item, idx) => {
          if (item === 'dots')
            return (
              <PaginationItem key={`${idx}-${item}-pagination`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          return (
            <PaginationItem
              className='cursor-pointer select-none'
              key={`${idx}-${item}-pagination`}>
              <PaginationLink
                size={size}
                isActive={p.active === p.range[idx]}
                search={{
                  page: item,
                }}>
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        <PaginationItem className='cursor-pointer select-none'>
          <PaginationNext
            size={size}
            search={{
              page: p.active < p.total ? p.active + 1 : p.active,
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

const UsersTable: FC<{
  pagination: PaginationParams
  loading?: boolean
}> = ({ loading, pagination }) => {
  if (loading) return <Spinner />

  return (
    <Card className='max-w-full w-full overflow-hidden'>
      <CardHeader className='flex flex-row items-center'>
        <div className='grid gap-2'>
          <CardTitle>Пользователи</CardTitle>
          <CardDescription>Управление пользователями и их картами</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table className='overflow-x-auto max-w-full'>
          <TableHeader>
            <TableRow>
              <TableHead>Имя</TableHead>
              <TableHead>Дата рождения</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead>Уровень привелегий</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className='font-medium'>
                    {user.firstName} {user.lastName}
                  </div>
                  <div className='text-muted-foreground inline'>{user.email}</div>
                </TableCell>
                <TableCell>{user.birthDate}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge>{user.privilegeLevel}</Badge>
                </TableCell>
                <TableCell>
                  <Button
                    aria-haspopup='true'
                    size='icon'
                    asChild
                    variant='ghost'>
                    <Link
                      to='/users/$userId/edit'
                      params={{ userId: user.id.toString() }}>
                      <EditIcon className='h-4 w-4' />
                      <span className='sr-only'>Edit user</span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className='mt-4 flex flex-row items-center'>
          <TablePagination
            size='icon'
            pagination={pagination}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default UsersTable
