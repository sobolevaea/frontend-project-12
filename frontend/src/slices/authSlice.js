import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: '',
  },
  reducers: {
    logout: (state) => {
      state.isAuth = false
      localStorage.removeItem('token')
    },
    login: (state) => {
      state.isAuth = localStorage.getItem('token') ? true : false
    },
  },
})

export const { actions } = authSlice
export default authSlice.reducer
