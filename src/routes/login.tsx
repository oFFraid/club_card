import { createFileRoute, redirect } from '@tanstack/react-router'

import AuthLayout from '@/components/layout/auth-layout.tsx'
import { NAVIGATION_FALLBACK } from '@/consts'
import { LoginForm } from '@/features/auth'
import { useLoginMutation } from '@/store/api/auth-slice.ts'
import { z } from '@/validation/ru-zod.ts'

const LoginPage = () => {
  const navigate = Route.useNavigate()
  const search = Route.useSearch()
  const [login] = useLoginMutation()

  return (
    <AuthLayout>
      <LoginForm
        onSubmit={async (data) => {
          await login({
            password: data.password,
            email: data.login,
          }).unwrap()
          await navigate({ to: search.redirect || NAVIGATION_FALLBACK })
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
      throw redirect({ to: search.redirect || NAVIGATION_FALLBACK })
    }
  },
  component: LoginPage,
})
