import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSelector } from '@reduxjs/toolkit'
import routes from '../../routes.js'
// создать для сообщений
// import { selectCurrentMessageId } from 'redux/slices/uiSelectors';
import { prepareHeaders } from './helpers'

const baseQuery = fetchBaseQuery({
  baseUrl: routes.messagesPath(),
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

// export const selectCurrentMessage = createSelector(
//   [selectMessagesData, selectCurrentMessageId],
//   (messages, currentMessageId) => (
//     messages.find((message) => message.id === currentMessageId) || null
//   ),
// );

export const {
  useGetMessagesQuery: useGetMessages,
  useAddMessageMutation: useAddMessage,
  useUpdateMessageMutation: useUpdateMessage,
  useDeleteMessageMutation: useDeleteMessage,
} = messagesApi

export default messagesApi
