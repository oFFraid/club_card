import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import NotFound from '@/components/not-found.tsx'
import { Toaster } from '@/components/ui/toaster.tsx'

export interface MyRouterContext {
  auth: {
    authenticated: boolean
  }
}

const RootPage = () => {
  return (
    <>
      <Outlet />

      {import.meta.env.MODE == 'development' && (
        <TanStackRouterDevtools
          position='bottom-right'
          initialIsOpen={false}
        />
      )}
      <Toaster />
    </>
  )
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootPage,
  notFoundComponent: () => {
    return <NotFound />
  },
})
