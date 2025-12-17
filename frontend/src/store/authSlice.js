import { createSlice, createSelector } from '@reduxjs/toolkit'

import authApi from './authApi'

const initialState = {
  username: localStorage.getItem('username') ?? null,
  token: localStorage.getItem('token') ?? null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      state.username = localStorage.getItem('username') ?? null
      state.token = localStorage.getItem('token') ?? null
    },
    login: (state) => {
      state.username = localStorage.getItem('username') ?? null
      state.token = localStorage.getItem('token') ?? null
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        Object.assign(state, {
          ...initialState,
          token: payload.token,
          username: payload.username,
        })
        localStorage.setItem('token', payload.token)
        localStorage.setItem('username', payload.username)
      },
    )
    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        Object.assign(state, {
          ...initialState,
          token: payload.token,
          username: payload.username,
        });
        localStorage.setItem('token', payload.token)
        localStorage.setItem('username', payload.username)
      },
    )
  }
})

export const selectAuth = state => state.auth

export const selectUser = createSelector(
  selectAuth,
  authState => authState.username,
)

export const selectToken = createSelector(
  selectAuth,
  authState => authState.token,
)

export const selectIsAuth = createSelector(
  selectToken,
  selectUser,
  (token, user) => Boolean(token) && Boolean(user),
)

export const { actions } = authSlice
export default authSlice.reducer
