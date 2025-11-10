import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChannelsAndMessages = createAsyncThunk(
  'chat/fetchData',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return thunkAPI.rejectWithValue('Нет токена');
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const [channelsRes, messagesRes] = await Promise.all([
        axios.get('/api/v1/channels', { headers }),
        axios.get('/api/v1/messages', { headers }),
      ]);
      return {
        channels: channelsRes.data,
        messages: messagesRes.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);