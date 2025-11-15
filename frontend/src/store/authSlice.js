import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('token') ?? null,
  isAuth: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false
      localStorage.removeItem('token')
    },
    login: (state) => {
      state.isAuth = initialState.token ? true : false
    },
  },
})

export const { actions } = authSlice
export default authSlice.reducer
