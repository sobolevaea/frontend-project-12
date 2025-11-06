import { useFormik } from 'formik'
import { object, string } from 'yup'

const loginSchema = object({
  username: string().required(),
  password: string().required(),
})

const LoginForm = () => {
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2))
    }
  })
  return (
    <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input type="username" name="username" className="form-control" onChange={formik.handleChange} value={formik.values.username} required placeholder='Ваш ник'/>
        <label htmlFor="username">Ваш ник</label>
      </div>
      <div className="form-floating mb-4">
        <input type="password" name="password" className="form-control" onChange={formik.handleChange} value={formik.values.password} required placeholder='Пароль'/>
        <label className="form-label" htmlFor="password">Пароль</label>
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </form>
  )
}

const BuildLoginPage = () => {
  return (
    <div className='card-body row p-5'>
      <LoginForm />
    </div>
  )
}

export const LoginPage = () => BuildLoginPage()