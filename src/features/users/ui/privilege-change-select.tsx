import { FC, useEffect } from 'react'

import { useToast } from '@/components/ui'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx'
import { USER_PRIVILEGES_NAMES } from '@/consts'
import { useChangeMemberPrivilegeMutation } from '@/store/api/members-slice.ts'
import { PrivilegeResponse } from '@/types/members.ts'

const PrivilegeChangeSelect: FC<{
  userId: number
  currentPrivilege: PrivilegeResponse
}> = ({ userId, currentPrivilege }) => {
  const [changePrivilegeMutation, changePrivilegeMutationInfo] = useChangeMemberPrivilegeMutation()
  const { toast } = useToast()
  const allPrivileges = Object.keys(USER_PRIVILEGES_NAMES) as PrivilegeResponse[]

  useEffect(() => {
    if (changePrivilegeMutationInfo.isError) {
      toast({
        title: 'Неизвестная ошибка !',
        variant: 'destructive',
      })
    }
  }, [changePrivilegeMutationInfo.isError, toast])

  return (
    <Select
      value={currentPrivilege}
      disabled={changePrivilegeMutationInfo.isLoading}
      onValueChange={(v) =>
        changePrivilegeMutation({
          id: userId,
          privilege: v as PrivilegeResponse,
        })
      }>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Привилегия' />
      </SelectTrigger>
      <SelectContent>
        {allPrivileges.map((privilegeValue) => (
          <SelectItem
            key={privilegeValue}
            value={privilegeValue}>
            {USER_PRIVILEGES_NAMES[privilegeValue]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default PrivilegeChangeSelect
