import { Link } from '@tanstack/react-router'
import { BoxIcon, EditIcon } from 'lucide-react'
import { FC, HTMLAttributes } from 'react'

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
import { privilegesMapping, rolesMapping } from '@/consts'
import { PaginationParams, usePagination } from '@/hooks/use-pagination.ts'
import { PrivilegeResponse, RoleResponse } from '@/types/members.ts'
import { cn } from '@/utils'

const TablePagination: FC<
  {
    pagination: PaginationParams
  } & Pick<ButtonProps, 'size'>
> = ({ pagination, size = 'sm' }) => {
  const paginationController = usePagination({ ...pagination, total: pagination.total, initialPage: 1 })

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            size={size}
            className='cursor-pointer select-none'
            search={{
              page: paginationController.active > 1 ? paginationController.active - 1 : paginationController.active,
            }}
          />
        </PaginationItem>

        {paginationController.range.map((item, idx) => {
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
                isActive={paginationController.active === paginationController.range[idx]}
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
              page:
                paginationController.active < paginationController.total
                  ? paginationController.active + 1
                  : paginationController.active,
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export type UserTableItem = {
  id: number
  firstName: string
  lastName: string
  birthDate?: string | null
  email: string
  privilegeLevel: PrivilegeResponse
  role: RoleResponse
}

const EmptyBlock: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <div
      className={cn('text-center', className)}
      {...props}>
      <div className='flex items-center justify-center mb-3'>
        <BoxIcon className='w-12 h-12' />
      </div>
      <span className='text-lg text-gray-500'>Список пуст</span>
    </div>
  )
}

const UsersTable: FC<{
  pagination: PaginationParams
  loading?: boolean
  items?: UserTableItem[]
  canEdit?: (item: UserTableItem) => boolean
}> = ({ loading, canEdit = () => true, items, pagination }) => {
  return (
    <Card className='max-w-full w-full overflow-hidden'>
      <CardHeader className='flex flex-row items-center'>
        <div className='grid gap-2'>
          <CardTitle>Пользователи</CardTitle>
          <CardDescription>Управление пользователями и их картами</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className='min-h-[300px]'>
            <Spinner />
          </div>
        )}
        {!loading && (
          <>
            <Table className='overflow-x-auto max-w-full'>
              <TableHeader>
                <TableRow>
                  <TableHead>Имя</TableHead>
                  <TableHead>Роль</TableHead>
                  <TableHead>Уровень привелегий</TableHead>
                  <TableHead>Дата рождения</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {items?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className='font-medium'>
                        {user.firstName} {user.lastName}
                      </div>
                      <div className='text-muted-foreground inline'>{user.email}</div>
                    </TableCell>
                    <TableCell>{rolesMapping(user.role)}</TableCell>
                    <TableCell>
                      <Badge>{privilegesMapping(user.privilegeLevel)}</Badge>
                    </TableCell>
                    <TableCell>{user.birthDate || '-'}</TableCell>
                    {canEdit && canEdit(user) && (
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
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {items?.length ? (
              <div className='mt-4 flex flex-row items-center'>
                <TablePagination
                  size='icon'
                  pagination={pagination}
                />
              </div>
            ) : (
              <EmptyBlock className='px-20' />
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default UsersTable
