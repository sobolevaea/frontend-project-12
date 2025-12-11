import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

import { selectIsAuth } from '../store/authSlice'
import { getPage, PAGE_LOGIN } from '../routes'

const PrivateRoute = () => {
  const isAuth = useSelector(selectIsAuth)

  return isAuth ? <Outlet /> : <Navigate to={getPage(PAGE_LOGIN)} />
}

export default PrivateRoute
