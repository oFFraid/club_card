import { IMemberUpdatePayload, IProfileResponse } from '@/types/members.ts'

import { apiSlice } from './api-slice'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query<IProfileResponse, void>({
      query: () => ({
        url: 'profile',
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),

    updateProfile: builder.mutation<unknown, IMemberUpdatePayload>({
      query: ({ firstName, lastName, birthDate, email, password, phone }) => ({
        url: `profile/update-fields`,
        method: 'PUT',
        body: { firstName, lastName, birthday: birthDate, email, password, phone },
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
  overrideExisting: false,
})

export const { useProfileQuery, useUpdateProfileMutation } = extendedApiSlice
