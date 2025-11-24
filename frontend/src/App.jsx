import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFoundPage from './components/NotFoundPage.jsx'
import MainPage from './components/MainPage.jsx'
import LoginPage from './components/LoginPage.jsx'
import SignupPage from './components/SignupPage.jsx'
import AuthWrapper from './components/AuthWrapper.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<AuthWrapper><LoginPage /></AuthWrapper>} />
        <Route path="signup" element={<AuthWrapper><SignupPage /></AuthWrapper>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
