export type PrivilegeResponse = 'STANDARD' | 'UP' | 'VIP'
export type RoleResponse = 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_SUPERUSER'

export interface IProfileResponse {
  id: number
  firstName: string
  lastName: string
  email: string
  locked: boolean
  privilege: PrivilegeResponse
  role: RoleResponse
  birthDay?: string | null
  phone?: string | null
}

export interface IMemberResponse {
  id: number
  firstName: string
  lastName: string
  email: string
  locked: boolean
  privilege: PrivilegeResponse
  role: RoleResponse
  birthDay?: string | null
  phone?: string | null
}
