import { createFileRoute, redirect } from '@tanstack/react-router'
import { useEffect } from 'react'

import AuthLayout from '@/components/layout/auth-layout.tsx'
import { NAVIGATION_FALLBACK } from '@/consts'
import { RegisterForm } from '@/features/auth'
import { useRegisterMutation } from '@/store/api/auth-slice.ts'
import { z } from '@/validation/ru-zod.ts'

const RegisterPage = () => {
  const [registerMutation, registerMutationData] = useRegisterMutation()
  const navigate = Route.useNavigate()

  useEffect(() => {
    if (registerMutationData?.error) {
      console.error(registerMutationData?.error)
    }
  }, [registerMutationData?.error])

  return (
    <AuthLayout>
      <RegisterForm
        onSubmit={async (data) => {
          await registerMutation({
            password: data.password,
            email: data.email,
            lastName: data.lastName,
            firstName: data.firstName,
            phone: data.phone,
          })
          await navigate({ to: '/login' })
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
