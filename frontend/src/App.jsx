import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NotFoundPage } from './components/NotFoundPage'
import { MainPage } from './components/MainPage'
import { LoginPage } from './components/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
