import { createFileRoute } from '@tanstack/react-router'

import Layout from '@/components/layout'

const MainPage = () => {
  return <Layout>main</Layout>
}

export const Route = createFileRoute('/_auth/main')({
  component: MainPage,
})
