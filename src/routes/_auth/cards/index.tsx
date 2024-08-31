import { createFileRoute } from '@tanstack/react-router'
import { useDispatch } from 'react-redux'

import { cardTemplatesMapping } from '@/components/cards-templates/consts.ts'
import { CardTemplateInfo } from '@/components/cards-templates/types.ts'
import Layout from '@/components/layout'
import { Button } from '@/components/ui'
import {
  useGetProfileCardTemplateQuery,
  useGetProfileCardTemplatesQuery,
  useSelectProfileCardTemplateMutation,
} from '@/store/api/card-templates-slice.ts'
import { useProfileQuery } from '@/store/api/members-slice.ts'
import { setToken } from '@/store/slices/auth-slice.ts'

const CardsPage = () => {
  const profileQuery = useProfileQuery()
  const profileCardTemplates = useGetProfileCardTemplatesQuery()
  const selectedProfileCardTemplate = useGetProfileCardTemplateQuery()
  const [selectProfileCardTemplate] = useSelectProfileCardTemplateMutation()

  const dispatch = useDispatch()

  if (profileQuery.isLoading || !profileQuery.data) return null
  if (profileCardTemplates.isLoading || !profileCardTemplates.data) return null
  if (selectedProfileCardTemplate.isLoading || !selectedProfileCardTemplate.data) return null

  const allowedTemplates = profileCardTemplates.data.templates
  const selectedTemplate = selectedProfileCardTemplate.data.template

  const cardInfo: CardTemplateInfo = {
    locked: profileQuery.data.locked,
    role: profileQuery.data.role,
    createdAt: profileQuery.data.birthDay || '',
    email: profileQuery.data.email,
    firstName: profileQuery.data.firstName,
    id: profileQuery.data?.id.toString(),
    lastName: profileQuery.data.lastName,
    privilege: profileQuery.data.privilege,
  }

  const CardComponent = cardTemplatesMapping[selectedTemplate].Component

  return (
    <Layout>
      {false && <Button onClick={() => dispatch(setToken())}>make token invalid</Button>}
      <div>
        <div className='text-xl mb-5 uppercase'>Шаблоны карт</div>
        <div className='flex gap-2 mb-4 mt-5'>
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
