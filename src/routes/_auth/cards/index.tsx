import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { PrimaryCard, SecondaryCard } from '@/components/cards-templates'
import { CardInfo } from '@/components/cards-templates/types.ts'
import Layout from '@/components/layout'
import { Button } from '@/components/ui'
import { useProfileQuery } from '@/store/api/members-slice.ts'
import { setToken } from '@/store/slices/auth-slice.ts'

const cardComponents = [PrimaryCard, SecondaryCard]

const CardsPage = () => {
  const [selected, setSelected] = useState<number>(0)
  const profileQuery = useProfileQuery()

  const dispatch = useDispatch()
  if (profileQuery.isLoading || !profileQuery.data) return null

  const cardInfo: CardInfo = {
    locked: profileQuery.data.locked,
    role: profileQuery.data.role,
    createdAt: profileQuery.data.birthDay || '',
    email: profileQuery.data.email,
    firstName: profileQuery.data.firstName,
    id: profileQuery.data?.id.toString(),
    lastName: profileQuery.data.lastName,
    privilege: profileQuery.data.privilege,
  }

  const CardComponent = cardComponents[selected]

  return (
    <Layout>
      {false && <Button onClick={() => dispatch(setToken())}>make token invalid</Button>}
      <div>
        <div className='text-xl mb-3 uppercase'>Шаблоны карт</div>
        <div className='flex gap-2 mb-4'>
          {new Array(cardComponents.length).fill(0).map((_, i) => (
            <Button
              key={i}
              variant={selected === i ? 'default' : 'outline'}
              onClick={() => setSelected(i)}>
              {i == 0 ? 'Вип' : 'Стандарт'}
            </Button>
          ))}
        </div>
        <div className='flex justify-center w-full h-full'>
          <div
            className='max-w-[500px] w-full'
            style={{
              aspectRatio: 390 / 220,
            }}>
            <CardComponent info={cardInfo} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const Route = createFileRoute('/_auth/cards/')({
  component: CardsPage,
})
