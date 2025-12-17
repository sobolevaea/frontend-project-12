import { useTranslation } from 'react-i18next'

import loginImg from '../../assets/avatar.jpg'
import LoginForm from './LoginForm.jsx'
import AuthWrapper from './AuthWrapper.jsx'
import { getPath, SIGNUP_PAGE } from '../../routes.js'

const LoginPage = () => {
  const { t } = useTranslation()

  return (
    <AuthWrapper>
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img src={loginImg} className="rounded-circle" alt={t('images.enter')} />
        </div>
        <LoginForm />
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>{t('texts.noAccount')}</span>
          {' '}
          <a href={getPath(SIGNUP_PAGE)}>{t('texts.signup')}</a>
        </div>
      </div>
    </AuthWrapper>
  )
}

export default LoginPage
