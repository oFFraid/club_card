import { createFileRoute, redirect } from '@tanstack/react-router'

import AuthLayout from '@/components/layout/auth-layout.tsx'
import { NAVIGATION_FALLBACK } from '@/consts'
import { RegisterForm } from '@/features/auth'
import { useToastOnError } from '@/hooks/use-toast-on.ts'
import { useRegisterMutation } from '@/store/api/auth-slice.ts'
import { getServerErrorStatus } from '@/utils'
import { z } from '@/validation/ru-zod.ts'

const RegisterPage = () => {
  const [registerMutation, registerMutationData] = useRegisterMutation()
  const navigate = Route.useNavigate()

  useToastOnError({
    isError: registerMutationData.isError,
    error: getServerErrorStatus(registerMutationData.error) === 409 ? 'Почта уже существует' : undefined,
  })

  return (
    <AuthLayout>
      <RegisterForm
        onSubmit={async (data) => {
          try {
            await registerMutation({
              password: data.password,
              email: data.email,
              lastName: data.lastName,
              firstName: data.firstName,
              phone: data.phone,
            }).unwrap()
            await navigate({ to: '/login' })
          } catch {
            /* empty */
          }
        }}
      />
    </AuthLayout>
  )
}

export const Route = createFileRoute('/register')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.authenticated) {
      throw redirect({ to: search.redirect || NAVIGATION_FALLBACK })
    }
  },
  component: RegisterPage,
})
