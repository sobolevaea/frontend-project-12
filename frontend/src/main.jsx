import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { io } from 'socket.io-client'
import initApp from './init.jsx'

// отсюда передаем сокет в инит
// сюда передаем из init
// функция будет асинхронной

const runApp = async () => {
  const socket = io('http://localhost:5002')
  const app = await initApp(socket)
  createRoot(document.getElementById('chat')).render(
    <StrictMode>
      {app}
    </StrictMode>,
  )
}

runApp()
