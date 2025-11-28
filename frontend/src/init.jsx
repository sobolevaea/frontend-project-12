import i18next from 'i18next'
import filter from 'leo-profanity'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { Provider as ProviderRollbar, ErrorBoundary } from '@rollbar/react'

import App from './App.jsx'
import store from './store/index.js'
import channelsApi from './store/channelsApi.js'
import messagesApi from './store/messagesApi.js'
import ru from './locales/index.js'
import rollbarConfig from './rollbar.js'

const defaultLanguage = 'ru'
const languages = [defaultLanguage, 'en']

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

  const i18n = i18next.createInstance()

  i18n.init({
    lng: defaultLanguage, // язык по умолчанию
    resources: {
      ru,
    },
    debug: false,
    interpolation: {
      escapeValue: false, // отключено для React
    },
  })

  languages.forEach(lng => filter.loadDictionary(lng))

  return (
    <ProviderRollbar config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n} defaultNS="translation">
            <App />
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </ProviderRollbar>
  )
}

export default initApp
