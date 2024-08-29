export interface ILoginPayload {
  email: string
  password: string
}

export interface ILoginResponse {
  accessToken: string
}

export interface IRegisterPayload {
  phone?: string
  lastName?: string
  firstName?: string
  birthDate?: string
  email: string
  password: string
}

export interface IRegisterResponse {
  email: string
}
