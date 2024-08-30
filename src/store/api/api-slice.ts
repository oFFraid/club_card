/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi } from '@reduxjs/toolkit/query/react'

import baseQueryWithReauth from './baseQuery'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Profile'],
  endpoints: (_builder) => ({}),
})
