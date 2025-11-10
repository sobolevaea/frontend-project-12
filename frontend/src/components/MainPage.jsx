import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BuildMainPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <>
      <h3>Main page</h3>
      <div>
        Main page content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </div>
    </>
  )
}

export const MainPage = () => BuildMainPage()
