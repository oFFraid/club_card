import { createFileRoute, redirect } from '@tanstack/react-router'

import Forbidden from '@/components/forbidden.tsx'

export const Route = createFileRoute('/forbidden')({
  beforeLoad: async ({ location }) => {
    if (location.href === '/') {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: Forbidden,
})
