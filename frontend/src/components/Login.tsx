import { useState } from 'react'
import { logIn } from '../contexts/userContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogIn = (e: any) => {
    e.preventDefault()
    logIn(email, password)
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
