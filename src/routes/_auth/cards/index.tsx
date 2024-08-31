import { createFileRoute } from '@tanstack/react-router'

import { cardTemplatesMapping } from '@/components/card-templates/consts.ts'
import Layout from '@/components/layout'
import { CurrentCardSelector } from '@/features/card-templates/ui/current-card-selector.tsx'
import useCardTemplateInfo from '@/hooks/use-card-template-info.ts'
import { useGetProfileCardTemplateQuery } from '@/store/api/card-templates-slice.ts'

const CardsPage = () => {
  const selectedProfileCardTemplate = useGetProfileCardTemplateQuery()
  const cardInfo = useCardTemplateInfo()

  const selectedTemplate = selectedProfileCardTemplate.data?.template
  const CardComponent = selectedTemplate ? cardTemplatesMapping[selectedTemplate].Component : () => null

  return (
    <Layout>
      <div>
        <div className='text-xl mb-5 uppercase'>Шаблоны карт</div>
        <div className='flex gap-2 mb-4 mt-5'>
          <CurrentCardSelector selectedTemplate={selectedTemplate} />
        </div>
        <div className='flex justify-center w-full h-full'>
          <div
            className='max-w-[500px] w-full'
            style={{
              aspectRatio: 390 / 220,
            }}>
            {cardInfo && <CardComponent info={cardInfo} />}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const Route = createFileRoute('/_auth/cards/')({
  component: CardsPage,
})
