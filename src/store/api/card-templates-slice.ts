import { ICardTemplate, ICardTemplates, ITemplatePrivilegesMap } from '@/types/card-templates.ts'

import { apiSlice } from './api-slice'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    selectPrivilegeForCardTemplate: builder.mutation<unknown, ITemplatePrivilegesMap>({
      query: ({ templatePrivilegesMap }) => ({
        url: `template-privilege/select`,
        method: 'PUT',
        body: { templatePrivilegesMap },
      }),
      invalidatesTags: ['CardTemplate', 'ProfileCardTemplate'],
    }),
    getCardTemplates: builder.query<ITemplatePrivilegesMap, void>({
      query: () => ({
        url: `template-privilege/all`,
        method: 'GET',
      }),
      providesTags: ['CardTemplate'],
    }),
    getProfileCardTemplates: builder.query<ICardTemplates, void>({
      query: () => ({
        url: 'profile/privilege-templates',
        method: 'GET',
      }),
    }),
    getProfileCardTemplate: builder.query<ICardTemplate, void>({
      query: () => ({
        url: 'profile/card',
        method: 'GET',
      }),
      providesTags: ['ProfileCardTemplate'],
    }),
    selectProfileCardTemplate: builder.mutation<unknown, ICardTemplate>({
      query: ({ template }) => ({
        url: 'profile/card/select',
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
