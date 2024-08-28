import { createFileRoute, LinkProps, redirect, useRouter } from '@tanstack/react-router'
import { useDispatch } from 'react-redux'

import AuthLayout from '@/components/layout/auth-layout.tsx'
import { LoginForm } from '@/features/auth'
import { useLoginMutation } from '@/store/api/auth-slice.ts'
import { login } from '@/store/slices/auth-slice.ts'
import { z } from '@/validation/ru-zod.ts'

const fallback: LinkProps['to'] = '/main' as const

const LoginPage = () => {
  const router = useRouter()
  const navigate = Route.useNavigate()
  const search = Route.useSearch()
  // const [login] = useLoginMutation()
  const dispatch = useDispatch()

  return (
    <AuthLayout>
      <LoginForm
        onSubmit={async (data) => {
          // await login({
          //   password: data.password,
          //   email: data.login,
          // }).unwrap()
          dispatch(
            login({
              password: 'test',
              username: 'test',
            }),
          )
          await router.invalidate()
          await navigate({ to: search.redirect || fallback })
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
