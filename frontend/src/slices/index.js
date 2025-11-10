import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import chatReducer from './chatSlice.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
})
