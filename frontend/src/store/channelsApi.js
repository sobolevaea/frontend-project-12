import { createSelector } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { getApiPath, CHANNELS_API } from '../../routes.js'
import { prepareHeaders } from './helpers'
import { selectCurrentChannelId } from './uiSlice.js'

const baseQuery = fetchBaseQuery({
  baseUrl: getApiPath(CHANNELS_API),
  prepareHeaders,
})

const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery,
  tagTypes: ['Channels', 'Messages'],
  endpoints: builder => ({
    addChannel: builder.mutation({
      query: channel => ({
        method: 'POST',
        body: channel,
      }),
    }),
    updateChannel: builder.mutation({
      query: ({ id, ...body }) => ({
        url: id,
        method: 'PATCH',
        body,
      }),
    }),
    deleteChannel: builder.mutation({
      query: ({ id }) => ({
        url: id,
        method: 'DELETE',
        invalidatesTags: ['Messages', 'Channels'],
      }),
      transformResponse: response => ({ ...response }),
    }),
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channels'],
    }),
  }),
})

const selectChannels = channelsApi.endpoints.getChannels.select()

const selectChannelsData = createSelector(
  selectChannels,
  channelsState => channelsState.data ?? [],
)

export const selectChannelsNames = createSelector(
  selectChannelsData,
  channels => channels.map(({ name }) => name),
)

export const selectCurrentChannel = createSelector(
  [selectChannelsData, selectCurrentChannelId],
  (channels, currentChannelId) => (
    channels.find(channel => channel.id === currentChannelId) || null
  ),
)

export const {
  useGetChannelsQuery: useGetChannels,
  useAddChannelMutation: useAddChannel,
  useUpdateChannelMutation: useUpdateChannel,
  useDeleteChannelMutation: useDeleteChannel,
} = channelsApi

export default channelsApi
