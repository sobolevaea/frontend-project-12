import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Page404 } from './components/404.jsx'
import { ChatPage } from './components/ChatPage.jsx'
import { LoginPage } from './components/LoginPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<ChatPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
