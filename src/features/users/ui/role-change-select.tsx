import { FC, useEffect } from 'react'

import { useToast } from '@/components/ui'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx'
import { USER_ROLES_NAMES } from '@/consts'
import { useChangeMemberRoleMutation } from '@/store/api/members-slice.ts'
import { RoleResponse } from '@/types/members.ts'

const RoleChangeSelect: FC<{
  userId: number
  currentRole: RoleResponse
}> = ({ userId, currentRole }) => {
  const [changeRoleMutation, changeRoleMutationInfo] = useChangeMemberRoleMutation()
  const { toast } = useToast()
  const allRoles: RoleResponse[] = ['ROLE_USER', 'ROLE_ADMIN']

  useEffect(() => {
    if (changeRoleMutationInfo.isError) {
      toast({
        title: 'Неизвестная ошибка !',
        variant: 'destructive',
      })
    }
  }, [changeRoleMutationInfo.isError, toast])

  return (
    <Select
      value={currentRole}
      disabled={changeRoleMutationInfo.isLoading}
      onValueChange={(v) =>
        changeRoleMutation({
          id: userId,
          role: v as RoleResponse,
        })
      }>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Роль' />
      </SelectTrigger>
      <SelectContent>
        {allRoles.map((roleValue) => (
          <SelectItem
            key={roleValue}
            value={roleValue}>
            {USER_ROLES_NAMES[roleValue]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default RoleChangeSelect
