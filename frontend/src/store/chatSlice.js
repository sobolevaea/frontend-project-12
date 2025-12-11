import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    messages: [],
    status: 'idle',
    error: null,
  },
})

export default chatSlice.reducer
