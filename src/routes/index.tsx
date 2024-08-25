import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

const HomeComponent = () => {
  return <Outlet />
}

export const Route = createFileRoute('/')({
  beforeLoad: async ({ location }) => {
    if (location.href === '/') {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: HomeComponent,
})
