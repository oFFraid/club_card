import { FC } from 'react'

import { PrivilegeResponse, RoleResponse } from '@/types/members.ts'

export type CardTemplateInfo = {
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

export type CardTemplateProps = {
  info: CardTemplateInfo
  onlyFrontSide?: boolean
}

export type CardTemplateNames = '1' | '2'

export type CardTemplate = {
  Component: FC<CardTemplateProps>
  label: string
}

export type CardTemplateMap = { [key in CardTemplateNames]: CardTemplate }
