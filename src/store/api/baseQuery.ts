// import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
// import { logout, login } from '../slices/auth-slice';
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { baseQueryUrl } from '@/consts/api.ts'
import { login, logout } from '@/store/slices/auth-slice.ts'

import type { RootState } from '../store'

const baseQuery = fetchBaseQuery({
  baseUrl: baseQueryUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
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
    // try to get a new token

    api.dispatch(logout())
    const refreshResult = await baseQuery(
      {
        url: '/refreshToken',
        method: 'POST',
      },
      api,
      extraOptions,
    )
    console.log('testsepo')

    if (refreshResult.data) {
      // store the new token in the store or wherever you keep it
      api.dispatch(login(refreshResult.data))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      // refresh failed - do something like redirect to login or show a "retry" button
      api.dispatch(logout())
      // window.location.reload()
    }
  }

  return result
}

export default baseQueryWithReauth
