import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import axios from 'axios'
import cn from 'classnames'
import { actions as authActions } from '../store/authSlice.js'

const loginSchema = object({
  username: string().required(),
  password: string().required(),
})

const LoginPage = () => {
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try {
      const response = await axios.post('/api/v1/login', values)
      const { token, username } = response.data
      console.log(`data: ${username}`)
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
      dispatch(authActions.login())
      navigate('/')
    }
    catch (e) {
      setError('Неверный логин или пароль')
      console.log(e)
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
    <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input type="username" name="username" className={inputClass} onChange={formik.handleChange} value={formik.values.username} required placeholder="Ваш ник" />
        <label htmlFor="username">Ваш ник</label>
      </div>
      <div className="form-floating mb-4">
        <input type="password" name="password" className={inputClass} onChange={formik.handleChange} value={formik.values.password} required placeholder="Пароль" />
        <label className="form-label" htmlFor="password">Пароль</label>
        {error && <div className="invalid-tooltip">{error}</div>}
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </form>
  )
}

export default LoginPage
