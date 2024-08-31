import { createFileRoute } from '@tanstack/react-router'
import { FC } from 'react'

import { cardTemplatesMapping } from '@/components/card-templates/consts.ts'
import { CardTemplateNames } from '@/components/card-templates/types.ts'
import Layout from '@/components/layout'
import { Button } from '@/components/ui'
import useCardTemplateInfo from '@/hooks/use-card-template-info.ts'
import {
  useGetProfileCardTemplateQuery,
  useGetProfileCardTemplatesQuery,
  useSelectProfileCardTemplateMutation,
} from '@/store/api/card-templates-slice.ts'
import { useProfileQuery } from '@/store/api/profile-slice.ts'

const CurrentCardSelector: FC<{
  selectedTemplate?: CardTemplateNames
}> = ({ selectedTemplate }) => {
  const profileQuery = useProfileQuery()
  const profileCardTemplates = useGetProfileCardTemplatesQuery()
  const [selectProfileCardTemplate] = useSelectProfileCardTemplateMutation()

  if (profileQuery.isLoading || !profileQuery.data) return null
  if (profileCardTemplates.isLoading || !profileCardTemplates.data) return null

  const allowedTemplates = profileCardTemplates.data.templates

  return (
    <>
      {allowedTemplates.map((key, i) => {
        const cardTemplate = cardTemplatesMapping[key]
        if (!cardTemplate) return null

        return (
          <Button
            key={i}
            variant={selectedTemplate === key ? 'default' : 'outline'}
            onClick={() =>
              key !== selectedTemplate &&
              selectProfileCardTemplate({
                template: key,
              })
            }>
            {cardTemplate.label}
          </Button>
        )
      })}
    </>
  )
}

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
