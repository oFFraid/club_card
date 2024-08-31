import { createFileRoute, redirect } from '@tanstack/react-router'
import { FC } from 'react'

import { cardTemplatesMapping } from '@/components/cards-templates/consts.ts'
import { CardTemplateInfo, CardTemplateNames } from '@/components/cards-templates/types.ts'
import Layout from '@/components/layout'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.tsx'
import { USER_PRIVILEGES_NAMES } from '@/consts'
import {
  useGetCardTemplatesQuery,
  useSelectPrivilegeForCardTemplateMutation,
} from '@/store/api/card-templates-slice.ts'
import { useProfileQuery } from '@/store/api/members-slice.ts'
import { PrivilegeResponse } from '@/types/members.ts'

const CardPrivilegeToggleGroup: FC<{
  value: PrivilegeResponse[]
  templateKey: CardTemplateNames
  templatePrivilegesMap: Record<CardTemplateNames, PrivilegeResponse[]>
}> = ({ value, templateKey, templatePrivilegesMap }) => {
  const allPrivileges = Object.keys(USER_PRIVILEGES_NAMES) as PrivilegeResponse[]
  const [selectPrivilege, selectPrivilegeMutation] = useSelectPrivilegeForCardTemplateMutation()

  return (
    <ToggleGroup
      disabled={selectPrivilegeMutation.isLoading}
      value={value}
      onValueChange={(value) =>
        selectPrivilege({
          templatePrivilegesMap: {
            ...templatePrivilegesMap,
            [templateKey]: value as PrivilegeResponse[],
          },
        })
      }
      variant='outline'
      type='multiple'>
      {allPrivileges.map((privilegeValue) => (
        <ToggleGroupItem
          key={privilegeValue}
          value={privilegeValue}
          aria-label={`toggle ${privilegeValue}`}>
          {USER_PRIVILEGES_NAMES[privilegeValue]}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

const CardsPage = () => {
  const profileQuery = useProfileQuery()
  const cardTemplates = useGetCardTemplatesQuery()

  if (profileQuery.isLoading || !profileQuery.data) return null
  if (cardTemplates.isLoading || !cardTemplates.data) return null

  const comps = Object.entries(cardTemplatesMapping).map(([key, v]) => ({
    ...v,
    selectedPrivileges: cardTemplates.data!.templatePrivilegesMap[key as CardTemplateNames],
    templateKey: key as CardTemplateNames,
  }))

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

  return (
    <Layout>
      <div>
        <div className='text-xl mb-5 uppercase'>Шаблоны карт</div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
          {comps.map((item, i) => {
            const CardComponent = item.Component

            return (
              <div key={i}>
                <div
                  className='w-full mb-5'
                  style={{
                    aspectRatio: 390 / 220,
                  }}>
                  <CardComponent
                    onlyFrontSide={true}
                    info={cardInfo}
                  />
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

export const Route = createFileRoute('/_auth/cards/templates')({
  component: CardsPage,
  beforeLoad: (ctx) => {
    if (!ctx.context.auth.canAccess(['ROLE_SUPERUSER', 'ROLE_ADMIN'])) {
      throw redirect({
        to: '/forbidden',
      })
    }
  },
})
