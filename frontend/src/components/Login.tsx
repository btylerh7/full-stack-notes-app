import axios from 'axios'
import { useState, useContext } from 'react'
import { UserContext } from '../contexts/userContext'

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
    <div className="container">
      <form onSubmit={handleLogIn}>
        <input
          placeholder="johnappleseed@gmail.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button formAction="submit">Log In</button>
      </form>
    </div>
  )
}

export default Login
