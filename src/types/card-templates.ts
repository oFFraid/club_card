import { CardTemplateNames } from '@/components/card-templates/types.ts'
import { PrivilegeResponse } from '@/types/members.ts'

export type ITemplatePrivilegesMap = {
  templatePrivilegesMap: Record<CardTemplateNames, PrivilegeResponse[]>
}

export type ICardTemplate = {
  template: CardTemplateNames
}

export type ICardTemplates = {
  templates: CardTemplateNames[]
}
