import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import Card from '@/components/cards-templates/card.tsx'
import SecondaryCard from '@/components/cards-templates/secondaryCard/secondaryCard.tsx'
import { CardInfo } from '@/components/cards-templates/types.ts'
import Layout from '@/components/layout'
import { Button } from '@/components/ui'

const info: CardInfo = {
  createdAt: '23.02.24',
  email: 'dima.twin@mail',
  firstName: 'Дмитрий',
  id: 'ad2qdad-ada2d-a2da',
  lastName: 'Свиридов',
  privilege: 'VIP',
  phone: '+7 937 092 12-57',
  qrLink:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/QR_Code_Example.svg/1024px-QR_Code_Example.svg.png',
}

const cardComponents = [Card, SecondaryCard]

const CardsPage = () => {
  const [selected, setSelected] = useState<number>(0)
  const Card = cardComponents[selected]

  return (
    <Layout>
      <div>
        <div className='text-xl mb-3 uppercase'>Шаблоны карт</div>
        <div className='flex gap-2 mb-4'>
          {new Array(cardComponents.length).fill(0).map((_, i) => (
            <Button
              key={i}
              variant={selected === i ? 'default' : 'outline'}
              onClick={() => setSelected(i)}>
              {i + 1}
            </Button>
          ))}
        </div>
        <div className='flex justify-center w-full h-full'>
          <div
            className='max-w-[500px] w-full'
            style={{
              aspectRatio: 390 / 220,
            }}>
            <Card info={info} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const Route = createFileRoute('/_auth/cards/')({
  component: CardsPage,
})
