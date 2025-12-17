import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { getPath, LOGIN_PAGE, MAIN_PAGE } from '../routes.js'
import { actions as authActions, selectIsAuth } from '../store/authSlice.js'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector(selectIsAuth)

  const handleExit = () => {
    dispatch(authActions.logout())
    navigate(getPath(LOGIN_PAGE))
  }

  const { t } = useTranslation()
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href={getPath(MAIN_PAGE)}>{t('titles.home')}</a>
        {isAuth && <button type="button" className="btn btn-primary" onClick={() => handleExit()}>{t('buttons.exit')}</button>}
      </div>
    </nav>
  )
}

export default Header
