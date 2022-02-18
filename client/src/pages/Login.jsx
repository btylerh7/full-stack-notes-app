import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../styles/Auth.css'
import { login, reset } from '../features/auth/authSlice'

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isError) {
      toast.error(message)
    }
    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }
  return (
    <div className="login-outer">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </label>
          <button className="btn" formAction="submit">
            Sign In
          </button>
          <div>
            <p>Don't have an account?</p>
            <Link className="link" to="/register">
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
