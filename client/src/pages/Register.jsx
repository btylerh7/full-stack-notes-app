import { handle } from 'express/lib/application'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector(
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
    if (a) {
    } else {
      const userData = {
        name,
        email,
        password,
      }
      dispatch(register(userData))
    }
  }
  return (
    <form className="login-form container" onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email:
        <input
          placeholder="johnappleseed@gmail.com"
          type="email"
          value={''}
          onChange={''}
        />
      </label>
      <label>
        Password:
        <input type="password" value={''} onChange={''} />
      </label>
      <button formAction="submit">Log In</button>
    </form>
  )
}

export default Register
