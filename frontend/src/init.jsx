// тут ожидается провайдер
// инициализация сокета
// локализация
// фильтр нецензурных сообщений

import { Provider } from 'react-redux'
import store from './store/index.js'
import App from './App.jsx'
import channelsApi from './store/channelsApi.js'
import messagesApi from './store/messagesApi.js'
// import { useAddMessage } from './store/messagesApi.js'
// import { useAddChannel } from './store/channelsApi.js'

const initApp = (socket) => {
  const listenerNewChannel = (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData(
        'getChannels',
        undefined,
        (draftChannels) => {
          draftChannels.push(payload);
        },
      ),
    );
  };

  const listenerNewMessage = (payload) => {
    store.dispatch(
      messagesApi.util.updateQueryData(
        'getMessages',
        undefined,
        (draftMessages) => {
          draftMessages.push(payload);
        },
      ),
    );
  };

  socket.on('newChannel', listenerNewChannel);
  socket.on('newMessage', listenerNewMessage);
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default initApp
