import { ILoginPayload, ILoginResponse, IRegisterPayload, IRegisterResponse } from '@/types/auth'

import { login, logout } from '../slices/auth-slice'
import { apiSlice } from './api-slice'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IRegisterResponse, IRegisterPayload>({
      query: ({ firstName, lastName, phone, birthDate, email, password }) => ({
        url: 'register',
        method: 'POST',
        body: { firstName, lastName, email, password, phone, birthDate },
      }),
    }),
    login: builder.mutation<ILoginResponse, ILoginPayload>({
      query: ({ email, password }) => ({
        url: 'login',
        method: 'POST',
        credentials: 'include',

        body: { email, password },
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            login({
              accessToken: data.accessToken,
            }),
          )
        } catch (error) {
          console.error(error)
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: 'refresh',
        method: 'POST',
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(login(data))
        } catch (error) {
          console.error(error)
          dispatch(logout())
        }
      },
    }),
    verifyEmail: builder.mutation<unknown, string>({
      query: (token) => ({
        url: `auth/verify-email`,
        method: 'POST',
        body: { token },
      }),
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation, useRefreshMutation, useVerifyEmailMutation } = extendedApiSlice
