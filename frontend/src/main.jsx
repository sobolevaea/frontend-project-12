import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import initApp from './init.jsx'

// отсюда передаем сокет в инит
// сюда передаем из init
// функция будет асинхронной

const runApp = async () => {
  const app = await initApp()
  createRoot(document.getElementById('chat')).render(
    <StrictMode>
      {app}
    </StrictMode>
  )
}

runApp()


