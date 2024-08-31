import { createApi } from '@reduxjs/toolkit/query/react'

import baseQueryWithReauth from './base-query.ts'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Profile', 'CardTemplate', 'ProfileCardTemplate'],
  endpoints: () => ({}),
})
