import { createSlice, createSelector } from '@reduxjs/toolkit'

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
