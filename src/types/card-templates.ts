export type ICardTemplateResponse = string

export interface IMemberUpdatePayload {
  password?: string
  firstName: string
  lastName: string
  email: string
  phone?: string | null
  birthDate?: string | null
}
