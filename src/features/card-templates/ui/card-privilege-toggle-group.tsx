import { FC } from 'react'

import { CardTemplateNames } from '@/components/card-templates/types.ts'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.tsx'
import { USER_PRIVILEGES_NAMES } from '@/consts'
import { useToastOnError, useToastOnSuccess } from '@/hooks/use-toast-on.tsx'
import { useSelectPrivilegeForCardTemplateMutation } from '@/store/api/card-templates-slice.ts'
import { PrivilegeResponse } from '@/types/members.ts'

export const CardPrivilegeToggleGroup: FC<{
  value: PrivilegeResponse[]
  templateKey: CardTemplateNames
  templatePrivilegesMap: Record<CardTemplateNames, PrivilegeResponse[]>
}> = ({ value, templateKey, templatePrivilegesMap }) => {
  const allPrivileges = Object.keys(USER_PRIVILEGES_NAMES) as PrivilegeResponse[]
  const [selectPrivilege, selectPrivilegeMutation] = useSelectPrivilegeForCardTemplateMutation()

  useToastOnError({
    isError: selectPrivilegeMutation.isError,
  })

  useToastOnSuccess({
    isSuccess: selectPrivilegeMutation.isSuccess,
  })

  return (
    <ToggleGroup
      size='xs'
      disabled={selectPrivilegeMutation.isLoading}
      defaultValue={value}
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
