import { FaSignInAlt, FaPlusCircle, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import Notes from './Notes'
import '../styles/Header.css'

function Header({ id }) {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClick = (e) => {
    dispatch(logout())
    navigate('/login')
  }
  return (
    <header className="header">
      <p>Hello, {user && user.name}</p> <br />
      <p>Add Note</p>
      <FaPlusCircle
        onClick={() => {
          navigate('/')
        }}
      />
      <Notes id={id} />
      <br />
      <button className="btn" onClick={handleClick}>
        Log Out
      </button>
    </header>
  )
}

export default Header
