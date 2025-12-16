import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

import { selectIsAuth } from '../store/authSlice.js'
import { getPage, PAGE_LOGIN } from './routes.js'

const PrivateRoute = () => {
  const isAuth = useSelector(selectIsAuth)

  return isAuth ? <Outlet /> : <Navigate to={getPage(PAGE_LOGIN)} />
}

export default PrivateRoute
