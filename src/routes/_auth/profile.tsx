import { createFileRoute, Navigate, useRouter } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'

import Layout from '@/components/layout'
import { Button } from '@/components/ui/button.tsx'
import Spinner from '@/components/ui/spinner.tsx'
import { NAVIGATION_FALLBACK } from '@/consts'
import { UsersDescriptionCard } from '@/features/users'
import { UserForm } from '@/features/users/ui/user-form.tsx'
import { useToastOnError, useToastOnSuccess } from '@/hooks/use-toast-on.ts'
import { useProfileQuery, useUpdateProfileMutation } from '@/store/api/profile-slice.ts'
import { cn } from '@/utils'
import { DateFormatter } from '@/utils/formatters.ts'

const MePage = () => {
  const router = useRouter()
  const profileQuery = useProfileQuery()
  const [updateProfile, updateProfileMutation] = useUpdateProfileMutation()

  useToastOnError({
    isError: updateProfileMutation.isError,
  })

  useToastOnSuccess({
    isSuccess: updateProfileMutation.isSuccess,
  })

  if (profileQuery.error) return <Navigate to={NAVIGATION_FALLBACK} />
  if (!profileQuery.data) return null

  return (
    <Layout>
      {profileQuery.isLoading && <Spinner />}
      {!profileQuery.isLoading && !!profileQuery.data && (
        <div>
          <div className={cn('flex items-center gap-2 py-3')}>
            <Button
              size='sm'
              onClick={() => router.history.back()}>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <span className='text-sm sm:text-xl md:text-2xl font-bold'>Профиль</span>
          </div>
          <div className='md:grid md:grid-cols-2 mt-5 gap-4'>
            <UsersDescriptionCard
              user={{
                firstName: profileQuery.data.firstName,
                lastName: profileQuery.data.lastName,
                email: profileQuery.data.email,
                phone: profileQuery.data.phone,
                locked: profileQuery.data.locked,
                role: profileQuery.data.role,
                privilege: profileQuery.data.privilege,
              }}
            />
            <UserForm
              initialValues={{
                firstName: profileQuery.data?.firstName || '',
                lastName: profileQuery.data?.lastName || '',
                email: profileQuery.data?.email,
                phone: profileQuery.data?.phone ? profileQuery.data.phone.replace(/[^0-9.]/g, '') : '',
                birthDate: profileQuery.data?.birthDay ? new Date(profileQuery.data?.birthDay) : undefined,
              }}
              onSubmit={({ email, phone, firstName, lastName, birthDate }) => {
                console.log('work')
                return updateProfile({
                  email,
                  phone: phone || null,
                  firstName,
                  lastName,
                  birthDate: DateFormatter.yyyymmdd(birthDate) || null,
                })
              }}
            />
          </div>
        </div>
      )}
    </Layout>
  )
}

export const Route = createFileRoute('/_auth/profile')({
  component: MePage,
})
