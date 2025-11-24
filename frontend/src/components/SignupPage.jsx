import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { object, string, ref, mixed } from 'yup'
import axios from 'axios'
import cn from 'classnames'
import { actions as authActions } from '../store/authSlice.js'

const signupSchema = object({
  username: string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов'),
  password: string().min(6, 'Не менее 6 символов'),
  confirmPassword: string().oneOf([ref('password')], 'Пароли должны совпадать'),
})

const SignupPage = () => {
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try {
      const response = await axios.post('/api/v1/signup', { username: values.username, password: values.password })
      const { token, username } = response.data
      dispatch(authActions.logout())
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
      dispatch(authActions.login())
      navigate('/')
    }
    catch (e) {
      if (e.status === 409) {
        setError('Такой пользователь уже существует')
        return
      }
      setError(e.message)
    }
  }

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: signupSchema,
    onSubmit,
  })

  const inputClass = cn('form-control', {
    'is-invalid': error,
  })

  return (
    <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
      <div className="">
        <img src="./src/assets/avatar-1.jpg" className="rounded-circle" alt="Регистрация" />
      </div>
      <form onSubmit={formik.handleSubmit} className="w-50">
        <h1 className="text-center mb-4">Регистрация</h1>
        <div className="form-floating mb-3">
          <input type="username" name="username" className={cn('form-control', {
            'is-invalid': formik.touched.username && formik.errors.username || error,
          })} onChange={formik.handleChange} value={formik.values.username} placeholder="От 3 до 20 символов" required />
          <label className="form-label" htmlFor="username">Имя пользователя</label>
          {formik.touched.username && formik.errors.username && <div placement="right" className="invalid-tooltip">{formik.errors.username}</div>}
        </div>
        <div className="form-floating mb-3">
          <input type="password" name="password" aria-describedby="passwordHelpBlock" className={cn('form-control', {
            'is-invalid': formik.touched.password && formik.errors.password || error,
          })} onChange={formik.handleChange} value={formik.values.password} placeholder="Не менее 6 символов" required />
          <label className="form-label" htmlFor="password">Пароль</label>
          {formik.touched.password && formik.errors.password && <div className="invalid-tooltip">{formik.errors.password}</div>}
        </div>
        <div className="form-floating mb-4">
          <input type="password" name="confirmPassword" className={cn('form-control', {
            'is-invalid': formik.touched.confirmPassword && formik.errors.confirmPassword || error,
          })} onChange={formik.handleChange} value={formik.values.confirmPassword} placeholder="Пароли должны совпадать" required />
          <label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className="invalid-tooltip">{formik.errors.confirmPassword}</div>}
          {error && <div className="invalid-tooltip">{error}</div>}
        </div>
        <button type="submit" className="w-100 btn btn-outline-primary">Зарегистрироваться</button>
      </form>
    </div>
  )
}

export default SignupPage
