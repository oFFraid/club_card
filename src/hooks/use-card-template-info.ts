import { useMemo } from 'react'

import { CardTemplateInfo } from '@/components/card-templates/types.ts'
import { useProfileQuery } from '@/store/api/profile-slice.ts'

const useCardTemplateInfo = () => {
  const profileQuery = useProfileQuery()

  return useMemo<CardTemplateInfo | undefined>(() => {
    if (!profileQuery.data) return undefined

    return {
      locked: profileQuery.data.locked,
      role: profileQuery.data.role,
      createdAt: profileQuery.data.birthDay || '',
      email: profileQuery.data.email,
      firstName: profileQuery.data.firstName,
      id: profileQuery.data?.id.toString(),
      lastName: profileQuery.data.lastName,
      privilege: profileQuery.data.privilege,
    }
  }, [profileQuery.data])
}

export default useCardTemplateInfo
