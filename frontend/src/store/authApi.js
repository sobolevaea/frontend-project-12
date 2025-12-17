import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { getApiPath, LOGIN_API, SIGNUP_API } from '../routes.js'

const baseQuery = fetchBaseQuery({
  baseUrl: '.',
})

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: getApiPath(LOGIN_API),
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: credentials => ({
        url: getApiPath(SIGNUP_API),
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const {
  useLoginMutation: useLogin,
  useSignupMutation: useSignup,
} = authApi

export default authApi
