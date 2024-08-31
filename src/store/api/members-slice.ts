import { login } from '@/store/slices/auth-slice.ts'
import { ILoginResponse } from '@/types/auth.ts'
import { ArrayResponse } from '@/types/common.ts'
import { IMemberResponse, PrivilegeResponse, RoleResponse } from '@/types/members.ts'

import { apiSlice } from './api-slice'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    members: builder.query<
      ArrayResponse<IMemberResponse>,
      {
        page?: number
        size: number
      }
    >({
      query: ({ page, size }) => ({
        url: 'members',
        method: 'GET',
        params: { page, size },
      }),
      providesTags: ['User'],
    }),
    updateMember: builder.mutation<ILoginResponse, { id: number; data: IMemberResponse }>({
      query: ({ id, data }) => ({
        url: `members/${id}`,
        method: 'POST',
        body: data,
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
    changeMemberLocked: builder.mutation<unknown, { id: number; locked: boolean }>({
      query: ({ id, locked }) => ({
        url: `members/${id}/change-locked`,
        method: 'PUT',
        body: { locked },
      }),
      invalidatesTags: ['User'],
    }),
    changeMemberRole: builder.mutation<unknown, { id: number; role: RoleResponse }>({
      query: ({ id, role }) => ({
        url: `members/${id}/change-role`,
        method: 'PUT',
        body: { value: role },
      }),
      invalidatesTags: ['User'],
    }),
    changeMemberPrivilege: builder.mutation<unknown, { id: number; privilege: PrivilegeResponse }>({
      query: ({ id, privilege }) => ({
        url: `members/${id}/change-privilege`,
        method: 'PUT',
        body: { value: privilege },
      }),
      invalidatesTags: ['User'],
    }),
    member: builder.query<
      IMemberResponse,
      {
        id: number
      }
    >({
      query: ({ id }) => ({
        url: `members/${id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useChangeMemberRoleMutation,
  useChangeMemberPrivilegeMutation,
  useChangeMemberLockedMutation,
  useMemberQuery,
  useMembersQuery,
} = extendedApiSlice
