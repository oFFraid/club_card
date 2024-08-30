import '@/styles/index.css'

import { RouterProps, RouterProvider } from '@tanstack/react-router'
import { FC } from 'react'

import Spinner from '@/components/ui/spinner.tsx'
import { useAppSelector } from '@/hooks/use-app-selector.ts'
import { useProfileQuery } from '@/store/api/members-slice.ts'

export const Router: FC<RouterProps> = (props) => {
  const authed = useAppSelector((state) => state.auth.isLoggedIn)
  const profileQuery = useProfileQuery()

  if (profileQuery.isLoading) return <Spinner />

  return (
    <RouterProvider
      context={{
        auth: {
          authenticated: authed,
          canAccess: (roles) => !!roles.find((e) => profileQuery.data?.role === e),
        },
      }}
      {...props}
    />
  )
}
