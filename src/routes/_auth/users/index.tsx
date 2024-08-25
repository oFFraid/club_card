import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import Layout from '@/components/layout'
import UsersTable from '@/features/users/ui/UsersTable.tsx'
import { paginationSchema } from '@/validation/pagination-schema.ts'

const UsersPage = () => {
  const { page } = Route.useSearch()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 700)
  }, [])

  return (
    <Layout>
      <UsersTable
        loading={loading}
        pagination={{
          page: page,
          total: 10,
        }}
      />
    </Layout>
  )
}

export const Route = createFileRoute('/_auth/users/')({
  component: UsersPage,
  validateSearch: paginationSchema,
})
