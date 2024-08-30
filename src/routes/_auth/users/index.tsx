import { createFileRoute, redirect } from '@tanstack/react-router'

import Layout from '@/components/layout'
import { UsersTable } from '@/features/users'
import { useMembersQuery, useProfileQuery } from '@/store/api/members-slice.ts'
import { paginationSchema } from '@/validation/pagination-schema.ts'

const perPage = 5

const UsersPage = () => {
  const { page } = Route.useSearch()
  const profileQuery = useProfileQuery()

  const membersQuery = useMembersQuery({
    page: page - 1,
    size: perPage,
  })

  const totalPages = Math.ceil((membersQuery?.data?.total || 0) / perPage)

  return (
    <Layout>
      <UsersTable
        canEdit={(e) => e.id !== profileQuery.data?.id}
        items={membersQuery?.data?.result?.map((e) => ({
          id: e.id,
          firstName: e.firstName,
          lastName: e.lastName,
          birthDate: e.birthDay,
          email: e.email,
          privilegeLevel: e.privilege,
          role: e.role,
        }))}
        loading={membersQuery.isFetching}
        pagination={{
          page: page,
          total: totalPages,
        }}
      />
    </Layout>
  )
}

export const Route = createFileRoute('/_auth/users/')({
  component: UsersPage,
  validateSearch: paginationSchema,
  beforeLoad: (ctx) => {
    if (!ctx.context.auth.canAccess(['ROLE_SUPERUSER', 'ROLE_ADMIN'])) {
      throw redirect({
        to: '/forbidden',
      })
    }
  },
})
