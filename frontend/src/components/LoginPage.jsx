import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import axios from 'axios'
import cn from 'classnames'
import { actions as authActions } from '../store/authSlice.js'
import { useTranslation } from 'react-i18next'

const loginSchema = object({
  username: string().required(),
  password: string().required(),
})

const LoginPage = () => {
  const [error, setError] = useState(null)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try {
      const response = await axios.post('/api/v1/login', values)
      const { token, username } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
      dispatch(authActions.login())
      navigate('/')
    }
    catch {
      setError(t('errors.wrongLoginOrPassword'))
    }
  }

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: loginSchema,
    onSubmit,
  })

  const inputClass = cn('form-control', {
    'is-invalid': error,
  })

  return (
    <>
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img src="./src/assets/avatar.jpg" className="rounded-circle" alt="Войти" />
        </div>
        <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
          <h1 className="text-center mb-4">{t('titles.enter')}</h1>
          <div className="form-floating mb-3">
            <input type="username" name="username" className={inputClass} onChange={formik.handleChange} value={formik.values.username} required placeholder={t('buttons.enterNickname')} />
            <label htmlFor="username">{t('buttons.enterNickname')}</label>
          </div>
          <div className="form-floating mb-4">
            <input type="password" name="password" className={inputClass} onChange={formik.handleChange} value={formik.values.password} required placeholder={t('buttons.enterPassword')} />
            <label className="form-label" htmlFor="password">{t('buttons.enterPassword')}</label>
            {error && <div className="invalid-tooltip">{error}</div>}
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('buttons.enter')}</button>
        </form>
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>{t('texts.noAccount')}</span> <a href="/signup">{t('texts.signup')}</a>
        </div>
      </div>
    </>
  )
}

export default LoginPage
