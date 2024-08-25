import { createFileRoute } from '@tanstack/react-router'

import Layout from '@/components/layout'

const CardAddPage = () => {
  return (
    <Layout>
      <div className='mx-auto' />
    </Layout>
  )
}

export const Route = createFileRoute('/_auth/cards/add')({
  component: CardAddPage,
})
