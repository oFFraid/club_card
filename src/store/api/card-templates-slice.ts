import { CardTemplateNames } from '@/components/cards-templates/types.ts'
import { PrivilegeResponse } from '@/types/members.ts'

import { apiSlice } from './api-slice'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    selectPrivilegeForCardTemplate: builder.mutation<
      unknown,
      {
        templatePrivilegesMap: Record<CardTemplateNames, PrivilegeResponse[]>
      }
    >({
      query: ({ templatePrivilegesMap }) => ({
        url: `/template-privilege/select`,
        method: 'PUT',
        body: { templatePrivilegesMap },
      }),
      invalidatesTags: ['CardTemplate', 'ProfileCardTemplate'],
    }),
    getCardTemplates: builder.query<
      {
        templatePrivilegesMap: Record<CardTemplateNames, PrivilegeResponse[]>
      },
      void
    >({
      query: () => ({
        url: `/template-privilege/all`,
        method: 'GET',
      }),
      providesTags: ['CardTemplate'],
    }),
    getProfileCardTemplates: builder.query<
      {
        templates: CardTemplateNames[]
      },
      void
    >({
      query: () => ({
        url: '/profile/privilege-templates',
        method: 'GET',
      }),
    }),
    getProfileCardTemplate: builder.query<
      {
        template: CardTemplateNames
      },
      void
    >({
      query: () => ({
        url: '/profile/card',
        method: 'GET',
      }),
      providesTags: ['ProfileCardTemplate'],
    }),
    selectProfileCardTemplate: builder.mutation<
      unknown,
      {
        template: CardTemplateNames
      }
    >({
      query: ({ template }) => ({
        url: '/profile/card/select',
        method: 'PUT',
        body: { template },
      }),
      invalidatesTags: ['ProfileCardTemplate'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetCardTemplatesQuery,
  useGetProfileCardTemplatesQuery,
  useGetProfileCardTemplateQuery,
  useSelectPrivilegeForCardTemplateMutation,
  useSelectProfileCardTemplateMutation,
} = extendedApiSlice
