import { PrivilegeResponse, RoleResponse } from '@/types/members.ts'

export type CardInfo = {
  firstName: string
  lastName: string
  email: string
  id: string
  phone?: string
  createdAt: string
  privilege: PrivilegeResponse
  locked: boolean
  role: RoleResponse
}
