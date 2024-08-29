import { ArrayResponse } from '@/types/common.ts'
import { IMemberResponse, IProfileResponse } from '@/types/members.ts'

import { apiSlice } from './api-slice'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query<IProfileResponse, void>({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
    }),
    members: builder.query<
      ArrayResponse<IMemberResponse>,
      {
        page?: number
        size: number
      }
    >({
      query: ({ page, size }) => ({
        url: '/members',
        method: 'GET',
        params: { page, size },
      }),
    }),
    member: builder.query<
      IMemberResponse,
      {
        id: number
      }
    >({
      query: ({ id }) => ({
        url: `/members/${id}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useProfileQuery, useMemberQuery, useMembersQuery } = extendedApiSlice
