import { createFileRoute, LinkProps, redirect } from '@tanstack/react-router'

import AuthLayout from '@/components/layout/auth-layout.tsx'
import { LoginForm } from '@/features/auth'
import { sleep } from '@/utils'
import { z } from '@/validation/ru-zod.ts'

const fallback: LinkProps['to'] = '/main' as const

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm
        onSubmit={(data) => {
          console.log(data)
          return sleep(2000)
        }}
      />
    </AuthLayout>
  )
}

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.authenticated) {
      throw redirect({ to: search.redirect || fallback })
    }
  },
  component: LoginPage,
})
