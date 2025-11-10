import { createSlice } from '@reduxjs/toolkit';
import { fetchChannelsAndMessages } from './chatThunks';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    messages: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // синхронные редьюсеры
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelsAndMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChannelsAndMessages.fulfilled, (state, action) => {
        state.channels = action.payload.channels;
        state.messages = action.payload.messages;
        state.status = 'succeeded';
      })
      .addCase(fetchChannelsAndMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default chatSlice.reducer;