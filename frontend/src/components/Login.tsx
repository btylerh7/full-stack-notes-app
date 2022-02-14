import axios from 'axios'
import { useState, useContext } from 'react'
import { UserContext } from '../contexts/userContext'
import '../styles/Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setLoggedIn, setUser } = useContext(UserContext)

  const handleLogIn = async (e: any) => {
    e.preventDefault()
    try {
      const currentUser = await axios.post('/api/users/login', {
        email: email,
        password: password,
      })
      setUser({
        email: currentUser.data.email,
        token: currentUser.data.token,
      })
      setLoggedIn(true)
    } catch (error) {
      console.log(error)
      return alert('There was an error logging in')
    }
  }
  return (
    <form className="login-form container" onSubmit={handleLogIn}>
      <label htmlFor="email">
        Email:
        <input
          placeholder="johnappleseed@gmail.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button formAction="submit">Log In</button>
    </form>
  )
}

export default Login
