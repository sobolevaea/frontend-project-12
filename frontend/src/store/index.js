import { configureStore } from '@reduxjs/toolkit'

import uiSlice from './uiSlice.js'
import authSlice from './authSlice.js'
import chatSlice from './chatSlice.js'
import authApi from './authApi.js'
import channelsApi from './channelsApi.js'
import messagesApi from './messagesApi.js'

const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
    ui: uiSlice,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(channelsApi.middleware)
    .concat(messagesApi.middleware),
  devTools: true,
})

export default store
