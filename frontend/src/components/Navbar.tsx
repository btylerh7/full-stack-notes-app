import { useState, useContext } from 'react'
import { UserContext } from '../contexts/userContext'

function Navbar() {
  const { setLoggedIn } = useContext(UserContext)
  const handleLogOut = () => {
    localStorage.removeItem('loggedIn')
    setLoggedIn(false)
  }
  return (
    <nav className="container">
      <div>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </nav>
  )
}

export default Navbar
