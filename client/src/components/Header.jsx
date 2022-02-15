import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClick = (e) => {
    dispatch(logout())
    navigate('/login')
  }
  return (
    <header className="header">
      <Link to="/login">
        <FaSignInAlt /> Login
      </Link>
      <Link to="/register">
        <FaUser /> Register
      </Link>
      <button onClick={handleClick}>Log Out</button>
    </header>
  )
}

export default Header
