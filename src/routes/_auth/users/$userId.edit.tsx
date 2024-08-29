import { createFileRoute, Navigate, useRouter } from '@tanstack/react-router'
import { AlertOctagon, ChevronLeft } from 'lucide-react'

import Layout from '@/components/layout'
import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Spinner from '@/components/ui/spinner.tsx'
import { NAVIGATION_FALLBACK } from '@/consts'
import { UserForm } from '@/features/users/ui/UserForm.tsx'
import { useMemberQuery } from '@/store/api/members-slice.ts'
import { cn } from '@/utils'

const UserEditPage = () => {
  const router = useRouter()
  const params = Route.useParams()

  const user = useMemberQuery({
    id: +params.userId,
  })

  // if (user.isLoading) return <Spinner />
  if (user.error) return <Navigate to={NAVIGATION_FALLBACK} />

  return (
    <Layout>
      {user.isLoading && <Spinner />}
      {!user.isLoading && (
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
            <UserForm
              initialValues={{
                firstName: user.data?.firstName || '',
                lastName: user.data?.lastName || '',
                email: user.data?.email,
                phone: user.data?.phone ? user.data.phone.replace(/[^0-9.]/g, '') : '',
                birthDate: user.data?.birthDay ? new Date(user.data?.birthDay) : undefined,
              }}
              onSubmit={console.log}
            />

            <Card className='w-full mt-5 md:mt-0'>
              <CardHeader>
                <CardTitle className='text-xl mb-1 font-medium'>Клубная карта</CardTitle>
              </CardHeader>
              <CardContent className='min-w-40 flex flex-col gap-4 h-full'>
                Здесь будет карта
                <div className='grid flex-1 grid-cols-2 gap-2 mt-5'>
                  <Button
                    variant='destructive'
                    className='w-full'>
                    <AlertOctagon className='mr-2 h-4 w-4' />
                    Заблокировать
                  </Button>
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
