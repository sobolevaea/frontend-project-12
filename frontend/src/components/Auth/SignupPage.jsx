import singupImg from '../../assets/avatar-1.jpg'
import SignupForm from './SignupForm.jsx'
import AuthWrapper from './AuthWrapper.jsx'
import { t } from 'i18next'

const SignupPage = () => {
  return (
    <AuthWrapper>
      <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
        <div className="">
          <img src={singupImg} className="rounded-circle" alt={t('images.signup')} />
        </div>
        <SignupForm />
      </div>
    </AuthWrapper>
  )
}

export default SignupPage
