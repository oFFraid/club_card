import { FC } from 'react'

import { cardTemplatesMapping } from '@/components/card-templates/consts.ts'
import { CardTemplateNames } from '@/components/card-templates/types.ts'
import { Button } from '@/components/ui'
import {
  useGetProfileCardTemplatesQuery,
  useSelectProfileCardTemplateMutation,
} from '@/store/api/card-templates-slice.ts'
import { useProfileQuery } from '@/store/api/profile-slice.ts'

export const CurrentCardSelector: FC<{
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
