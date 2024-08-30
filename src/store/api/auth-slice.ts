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
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `logout`,
        method: 'GET',
      }),

      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(logout())
        } catch {
          console.log('error')
        }
      },
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation, useRefreshMutation, useLogoutMutation } = extendedApiSlice
