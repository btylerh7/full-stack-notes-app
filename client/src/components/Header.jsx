import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <Link to="/login">
        <FaSignInAlt /> Login
      </Link>
      <Link to="/register">
        <FaUser /> Register
      </Link>
    </header>
  )
}

export default Header
