import '@/styles/index.css'

import { RouterProps, RouterProvider } from '@tanstack/react-router'
import { FC, useEffect } from 'react'

import Spinner from '@/components/ui/spinner.tsx'
import { useAppSelector } from '@/hooks/use-app-selector.ts'
import { useProfileQuery } from '@/store/api/profile-slice.ts'

export const Router: FC<RouterProps> = (props) => {
  const authed = useAppSelector((state) => state.auth.isLoggedIn)
  const profileQuery = useProfileQuery()

  useEffect(() => {
    if (authed) profileQuery.refetch()
  }, [authed, profileQuery.refetch])

  if (authed && !profileQuery.data) return <Spinner />

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
