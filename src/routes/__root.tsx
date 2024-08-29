import { createRootRouteWithContext, Outlet, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useEffect } from 'react'

import NotFound from '@/components/not-found.tsx'
import { Toaster } from '@/components/ui/toaster.tsx'
import { useAppSelector } from '@/hooks/use-app-selector.ts'
import { usePrevious } from '@/hooks/use-prev.ts'

export interface MyRouterContext {
  auth: {
    authenticated: boolean
  }
}

const RootPage = () => {
  const { invalidate, navigate, history } = useRouter()
  const isAuthed = useAppSelector((state) => state.auth.isLoggedIn)
  const prevIsAuthed = usePrevious(isAuthed)

  useEffect(() => {
    invalidate()
  }, [invalidate, isAuthed])

  useEffect(() => {
    if (prevIsAuthed && !isAuthed) {
      navigate({
        to: '/login',
        search: {
          redirect: history.location.href,
        },
      })
    }
  }, [history.location.href, isAuthed, navigate, prevIsAuthed])

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
