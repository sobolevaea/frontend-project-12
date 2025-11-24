import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { actions as authActions } from '../store/authSlice.js'

import store from '../store/index.js'

const AuthWrapper = ({ children }) => {
  const state = store.getState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleExit = () => {
    dispatch(authActions.logout())
    navigate('/login')
  }

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">Hexlet Chat</a>
          {state.auth.isAuth && <button type="button" className="btn btn-primary" onClick={() => handleExit()}>Выйти</button>}
        </div>
      </nav>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthWrapper
