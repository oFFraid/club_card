import { LinkProps } from '@tanstack/react-router'

import { PrivilegeResponse, RoleResponse } from '@/types/members.ts'

export const NAVIGATION_FALLBACK: LinkProps['to'] = '/cards' as const

export const USER_ROLES_NAMES: { [key in RoleResponse]: string } = {
  ROLE_ADMIN: 'Администратор',
  ROLE_SUPERUSER: 'Суперпользователь',
  ROLE_USER: 'Пользователь',
}

export const rolesMapping = (role?: RoleResponse) => {
  if (!role) return ''

  return USER_ROLES_NAMES[role]
}

export const USER_PRIVILEGES_NAMES: { [key in PrivilegeResponse]: string } = {
  STANDARD: 'Стандарт',
  VIP: 'VIP',
  UP: 'Повышенный',
}

export const privilegesMapping = (role?: PrivilegeResponse) => {
  if (!role) return ''
  return USER_PRIVILEGES_NAMES[role]
}
