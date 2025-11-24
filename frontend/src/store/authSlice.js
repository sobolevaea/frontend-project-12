import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: localStorage.getItem('username') ?? null,
  token: localStorage.getItem('token') ?? null,
  isAuth: localStorage.getItem('token') ? true : false,
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
      state.isAuth = state.token ? true : false
    },
    login: (state) => {
      state.username = localStorage.getItem('username') ?? null
      state.token = localStorage.getItem('token') ?? null
      state.isAuth = state.token ? true : false
    },
  },
})

export const { actions } = authSlice
export default authSlice.reducer
