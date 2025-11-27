import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { io } from 'socket.io-client'
import initApp from './init.jsx'

const runApp = async () => {
  const socket = io()
  const app = await initApp(socket)
  createRoot(document.getElementById('chat')).render(
    <StrictMode>
      {app}
    </StrictMode>,
  )
}

runApp()
