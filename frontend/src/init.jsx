// тут ожидается провайдер
// инициализация сокета
// локализация
// фильтр нецензурных сообщений

import { Provider } from 'react-redux'
import store from './store/index.js'
import App from './App.jsx'

const initApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default initApp
