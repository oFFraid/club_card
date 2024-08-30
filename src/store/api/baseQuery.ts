import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { baseQueryUrl } from '@/consts/api.ts'
import { login, logout, removeToken } from '@/store/slices/auth-slice.ts'

import type { RootState } from '../store'

const baseQuery = fetchBaseQuery({
  baseUrl: baseQueryUrl,
  credentials: 'include',

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    console.log(headers)
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    } else {
      headers.delete('authorization')
    }
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    api.dispatch(removeToken())

    const refreshResult = await baseQuery(
      {
        url: '/refreshToken',
        method: 'POST',
      },
      api,
      extraOptions,
    )

    if (refreshResult.data) {
      api.dispatch(login(refreshResult.data))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }

  return result
}

export default baseQueryWithReauth
