import '@/styles/index.css'

import { RouterProps, RouterProvider } from '@tanstack/react-router'
import { FC } from 'react'

export const Router: FC<RouterProps> = (props) => {
  return (
    <RouterProvider
      context={{
        auth: {
          authenticated: true,
        },
      }}
      {...props}
    />
  )
}
