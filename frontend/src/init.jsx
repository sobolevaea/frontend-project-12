// тут ожидается провайдер
// инициализация сокета
// локализация
// фильтр нецензурных сообщений

import { Provider } from 'react-redux'
import store from './store/index.js'
import App from './App.jsx'
import channelsApi from './store/channelsApi.js'
import messagesApi from './store/messagesApi.js'

const initApp = (socket) => {
  const listenerNewMessage = (payload) => {
    store.dispatch(
      messagesApi.util.updateQueryData(
        'getMessages',
        undefined,
        (draftMessages) => {
          draftMessages.push(payload)
        },
      ),
    )
  }

  const listenerNewChannel = (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData(
        'getChannels',
        undefined,
        (draftChannels) => {
          draftChannels.push(payload)
        },
      ),
    )
  }

  const listenerRemoveChannel = (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData(
        'getChannels',
        undefined,
        (draftChannels) => {
          const index = draftChannels.findIndex(channel => channel.id === payload.id)
          if (index !== -1) {
            draftChannels.splice(index, 1)
          }
        },
      ),
    )
    store.dispatch(
      messagesApi.util.updateQueryData(
        'getMessages',
        undefined,
        (draftMessages) => {
          return draftMessages.filter(message => message.channelId !== payload.id)
        },
      ),
    )
  }

  const listenerRenameChannel = (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData(
        'getChannels',
        undefined,
        (draftChannels) => {
          const channel = draftChannels.find(ch => ch.id === payload.id)
          if (channel) {
            channel.name = payload.name
          }
        },
      ),
    )
  }

  socket.on('newMessage', listenerNewMessage)
  socket.on('newChannel', listenerNewChannel)
  socket.on('removeChannel', listenerRemoveChannel)
  socket.on('renameChannel', listenerRenameChannel)
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default initApp
