import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Modal from './components/Modal/index.jsx'
import Header from './components/Header.jsx'
import Toaster from './components/Toaster.jsx'
import MainPage from './components/MainPage.jsx'
import LoginPage from './components/LoginPage.jsx'
import SignupPage from './components/SignupPage.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'
import PrivateRoute from './components/misc/PrivateRoute.jsx'
import { getPath, MAIN_PAGE, LOGIN_PAGE, SIGNUP_PAGE, NOT_FOUND_PAGE } from '../routes.js'

const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path={getPath(NOT_FOUND_PAGE)} element={<NotFoundPage />} />
          <Route element={<PrivateRoute />}>
            <Route path={getPath(MAIN_PAGE)} element={<MainPage />} />
          </Route>
          <Route path={getPath(LOGIN_PAGE)} element={<LoginPage />} />
          <Route path={getPath(SIGNUP_PAGE)} element={<SignupPage />} />
        </Routes>
      </div>
      <Toaster
        position="top-right"
        theme="light"
        autoClose={5000}
      />
      <Modal />
    </BrowserRouter>
  )
}

export default App
