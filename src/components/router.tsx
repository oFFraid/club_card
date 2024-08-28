import '@/styles/index.css'

import { RouterProps, RouterProvider } from '@tanstack/react-router'
import { FC } from 'react'

import { useAppSelector } from '@/hooks/use-app-selector.ts'

export const Router: FC<RouterProps> = (props) => {
  const authed = useAppSelector((state) => state.auth.isLoggedIn)

  return (
    <RouterProvider
      context={{
        auth: {
          authenticated: authed,
        },
      }}
      {...props}
    />
  )
}
