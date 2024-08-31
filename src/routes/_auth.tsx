import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import ErrorBoundary from '@/components/error-boundary.tsx'
import Layout from '@/components/layout'

const AuthLayout = () => {
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
  errorComponent: () => (
    <Layout>
      <ErrorBoundary />
    </Layout>
  ),
})
