import cn from 'classnames'
import axios, { isAxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import { object, string, ref } from 'yup'

import singupImg from '../assets/avatar-1.jpg'
import { actions as authActions } from '../store/authSlice.js'

const SignupPage = () => {
  const [error, setError] = useState(null)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleError = (error) => {
    toast.error(`${error}`)
  }

  const onSubmit = async (values) => {
    try {
      const response = await axios.post('/api/v1/signup', {
        username: values.username,
        password: values.password,
      })
      const { token, username } = response.data
      dispatch(authActions.logout())
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
      dispatch(authActions.login())
      navigate('/')
    }
    catch (e) {
      if (e.status === 409) {
        setError(t('errors.userExists'))
        return
      }
      if (isAxiosError(e)) {
        handleError(t('errors.networkError'))
        return
      }
      setError(e.message)
    }
  }

  const validationSchema = object({
    username: string()
      .trim()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: string().trim().min(6, 'Не менее 6 символов'),
    confirmPassword: string()
      .trim()
      .oneOf([ref('password')], 'Пароли должны совпадать'),
  })

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema,
    onSubmit,
  })

  return (
    <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
      <div className="">
        <img src={singupImg} className="rounded-circle" alt="Регистрация" />
      </div>
      <form onSubmit={formik.handleSubmit} className="w-50">
        <h1 className="text-center mb-4">{t('titles.signup')}</h1>
        <div className="form-floating mb-3">
          <input
            id="username"
            name="username"
            className={cn('form-control', {
              'is-invalid':
                (formik.touched.username && formik.errors.username) || error,
            })}
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder={t('errors.from3to20Symbols')}
            required
          />
          <label className="form-label" htmlFor="username">
            {t('buttons.enterUsername')}
          </label>
          {formik.touched.username && formik.errors.username && (
            <div className="invalid-tooltip">{formik.errors.username}</div>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            id="password"
            type="password"
            name="password"
            aria-describedby="passwordHelpBlock"
            className={cn('form-control', {
              'is-invalid':
                (formik.touched.password && formik.errors.password) || error,
            })}
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder={t('errors.moreThan6Symbols')}
            required
          />
          <label className="form-label" htmlFor="password">
            {t('buttons.enterPassword')}
          </label>
          {formik.touched.password && formik.errors.password && (
            <div className="invalid-tooltip">{formik.errors.password}</div>
          )}
        </div>
        <div className="form-floating mb-4">
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            className={cn('form-control', {
              'is-invalid':
                (formik.touched.confirmPassword
                  && formik.errors.confirmPassword)
                || error,
            })}
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            placeholder={t('errors.mustBeSamePasswords')}
            required
          />
          <label className="form-label" htmlFor="confirmPassword">
            {t('buttons.confirmPassword')}
          </label>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="invalid-tooltip">
              {formik.errors.confirmPassword}
            </div>
          )}
          {error && <div className="invalid-tooltip">{error}</div>}
        </div>
        <button type="submit" className="w-100 btn btn-outline-primary">
          {t('buttons.signup')}
        </button>
      </form>
    </div>
  )
}

export default SignupPage
