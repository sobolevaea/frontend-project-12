import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

import { selectIsAuth } from '../../store/authSlice.js'
import { getPath, LOGIN_PAGE } from '../../../routes.js'

const PrivateRoute = () => {
  const isAuth = useSelector(selectIsAuth)

  return isAuth ? <Outlet /> : <Navigate to={getPath(LOGIN_PAGE)} />
}

export default PrivateRoute
