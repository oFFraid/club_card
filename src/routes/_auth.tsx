import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import Spinner from '@/components/ui/spinner.tsx'
import { useProfileQuery } from '@/store/api/members-slice.ts'

const AuthLayout = () => {
  const profileQuery = useProfileQuery()

  if (profileQuery.isLoading) return <Spinner />
  return <Outlet />
}

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.authenticated) {
      throw redirect({
        to: '/login',
        replace: true,
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthLayout,
})
