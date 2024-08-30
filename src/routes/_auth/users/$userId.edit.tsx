import { createFileRoute, Navigate, useRouter } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'

import Layout from '@/components/layout'
import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Spinner from '@/components/ui/spinner.tsx'
import { NAVIGATION_FALLBACK } from '@/consts'
import {
  UserBlockButton,
  UsersDescriptionCard,
  UsersPrivilegeChangesSelect,
  UsersRolesChangesSelect,
} from '@/features/users'
import { useMemberQuery } from '@/store/api/members-slice.ts'
import { cn } from '@/utils'

const UserEditPage = () => {
  const router = useRouter()
  const params = Route.useParams()

  const user = useMemberQuery({
    id: +params.userId,
  })

  if (user.error) return <Navigate to={NAVIGATION_FALLBACK} />
  if (!user.data) return null

  return (
    <Layout>
      {user.isLoading && <Spinner />}
      {!user.isLoading && !!user.data && (
        <div>
          <div className={cn('flex items-center gap-2 py-3')}>
            <Button
              size='sm'
              onClick={() => router.history.back()}>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <span className='text-sm sm:text-xl md:text-2xl font-bold'>
              Пользователь {user.data?.firstName} {user.data?.lastName}
            </span>
          </div>
          <div className='md:grid md:grid-cols-2 gap-4'>
            <UsersDescriptionCard
              user={user.data}
              className='mt-5 md:mt-0'
            />
            {/*<UserForm*/}
            {/*  initialValues={{*/}
            {/*    firstName: user.data?.firstName || '',*/}
            {/*    lastName: user.data?.lastName || '',*/}
            {/*    email: user.data?.email,*/}
            {/*    phone: user.data?.phone ? user.data.phone.replace(/[^0-9.]/g, '') : '',*/}
            {/*    birthDate: user.data?.birthDay ? new Date(user.data?.birthDay) : undefined,*/}
            {/*  }}*/}
            {/*  onSubmit={console.log}*/}
            {/*/>*/}

            <Card className='w-full mt-5 md:mt-0'>
              <CardHeader>
                <CardTitle className='text-xl mb-1 font-medium'>Действия</CardTitle>
              </CardHeader>
              <CardContent className='min-w-40 flex flex-col gap-4 h-full'>
                <div className='grid grid-cols-2 gap-5 mt-5'>
                  <UsersRolesChangesSelect
                    userId={user.data.id}
                    currentRole={user.data.role}
                  />
                  <UsersPrivilegeChangesSelect
                    userId={user.data.id}
                    currentPrivilege={user.data.privilege}
                  />
                  <UserBlockButton
                    locked={user.data.locked}
                    userId={user.data.id}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </Layout>
  )
}

export const Route = createFileRoute('/_auth/users/$userId/edit')({
  component: UserEditPage,
})
