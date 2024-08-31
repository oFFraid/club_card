import { createFileRoute, redirect } from '@tanstack/react-router'
import { useMemo } from 'react'

import { cardTemplatesMapping } from '@/components/card-templates/consts.ts'
import { CardTemplateNames } from '@/components/card-templates/types.ts'
import Layout from '@/components/layout'
import { CardPrivilegeToggleGroup } from '@/features/card-templates/ui/card-privilege-toggle-group.tsx'
import useCardTemplateInfo from '@/hooks/use-card-template-info.ts'
import { useGetCardTemplatesQuery } from '@/store/api/card-templates-slice.ts'

const CardsPage = () => {
  const cardTemplates = useGetCardTemplatesQuery()
  const cardInfo = useCardTemplateInfo()

  const templatesInfo = useMemo(() => {
    if (!cardTemplates.data) return

    return Object.entries(cardTemplatesMapping).map(([key, v]) => ({
      ...v,
      selectedPrivileges: cardTemplates.data!.templatePrivilegesMap[key as CardTemplateNames],
      templateKey: key as CardTemplateNames,
    }))
  }, [cardTemplates.data])

  return (
    <Layout>
      <div>
        <div className='text-xl mb-5 uppercase'>Шаблоны карт</div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
          {templatesInfo?.map((item, i) => {
            const CardComponent = item.Component

            return (
              <div key={i}>
                <div
                  className='w-full mb-5'
                  style={{
                    aspectRatio: 390 / 220,
                  }}>
                  {cardInfo && (
                    <CardComponent
                      onlyFrontSide={true}
                      info={cardInfo}
                    />
                  )}
                </div>
                <CardPrivilegeToggleGroup
                  templateKey={item.templateKey}
                  templatePrivilegesMap={cardTemplates.data!.templatePrivilegesMap}
                  value={item.selectedPrivileges}
                />
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export const Route = createFileRoute('/_auth/card-templates')({
  component: CardsPage,
  beforeLoad: (ctx) => {
    if (!ctx.context.auth.canAccess(['ROLE_SUPERUSER', 'ROLE_ADMIN'])) {
      throw redirect({
        to: '/forbidden',
      })
    }
  },
})
