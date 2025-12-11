import { createSelector } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { getApiPath, MESSAGES_API } from '../../routes.js'
import { prepareHeaders } from './helpers'
import { selectCurrentChannelId } from './uiSlice.js'

const baseQuery = fetchBaseQuery({
  baseUrl: getApiPath(MESSAGES_API),
  prepareHeaders,
})

const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery,
  tagTypes: ['Channels', 'Messages'],
  endpoints: builder => ({
    addMessage: builder.mutation({
      query: message => ({
        method: 'POST',
        body: message,
      }),
    }),
    updateMessage: builder.mutation({
      query: ({ id, ...body }) => ({
        url: id,
        method: 'PATCH',
        body,
      }),
    }),
    deleteMessage: builder.mutation({
      query: ({ id }) => ({
        url: id,
        method: 'DELETE',
        invalidatesTags: ['Messages', 'Channels'],
      }),
      transformResponse: response => ({ ...response }),
    }),
    getMessages: builder.query({
      query: () => '',
      providesTags: ['Messages'],
    }),
  }),
})

const selectMessages = messagesApi.endpoints.getMessages.select()

const selectMessagesData = createSelector(
  selectMessages,
  messagesState => messagesState.data ?? [],
)

export const selectMessagesNames = createSelector(
  selectMessagesData,
  messages => messages.map(({ name }) => name),
)

export const selectCurrentMessages = createSelector(
  [selectMessagesData, selectCurrentChannelId],
  (messages, currentChannelId) => (
    messages.filter(message => message.channelId === currentChannelId) || null
  ),
)

export const {
  useGetMessagesQuery: useGetMessages,
  useAddMessageMutation: useAddMessage,
  useUpdateMessageMutation: useUpdateMessage,
  useDeleteMessageMutation: useDeleteMessage,
} = messagesApi

export default messagesApi
