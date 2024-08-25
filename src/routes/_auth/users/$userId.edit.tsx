import { createFileRoute, useRouter } from '@tanstack/react-router'
import { AlertOctagon, ChevronLeft } from 'lucide-react'

import Layout from '@/components/layout'
import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserForm } from '@/features/users/ui/UserForm.tsx'

const UserEditPage = () => {
  const router = useRouter()

  return (
    <Layout>
      <div className='flex items-center gap-2 py-3'>
        <Button
          size='sm'
          onClick={() => router.history.back()}>
          <ChevronLeft className='h-4 w-4' />
        </Button>
        <span className='text-sm sm:text-xl md:text-2xl font-bold'>Пользователь Свиридов Дмитрий</span>
      </div>
      <div className='md:grid md:grid-cols-2 gap-4'>
        <UserForm
          initialValues={{
            firstName: 'Дмитрий',
            lastName: 'Sviridov',
            email: 'sviridov@gmail.com',
            phone: '79370921257',
            birthDate: new Date(),
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
    </Layout>
  )
}

export const Route = createFileRoute('/_auth/users/$userId/edit')({
  component: UserEditPage,
})
