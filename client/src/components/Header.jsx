import { FaPlusCircle, FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import Notes from './Notes'
import '../styles/Header.css'
import { useState } from 'react'

function Header({ id }) {
  const [clicked, setClicked] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isMedium = useMediaQuery({ minWidth: 768 })

  const handleClick = (e) => {
    dispatch(logout())
    navigate('/login')
  }
  return (
    <header className="header">
      <div className="nav flex-2-items">
        {!isMedium && (
          <FaBars onClick={() => setClicked(clicked ? false : true)} />
        )}
        <p>Hello, {user && user.name}</p>
      </div>
      <br />
      <div className={!clicked && 'hidden'}>
        <div
          onClick={() => {
            navigate('/')
          }}
          className="flex-2-items pointer"
        >
          <p>Add Note</p>
          <FaPlusCircle />
        </div>
        <br />
        <Notes id={id} />
        <br />
        <button className="btn" onClick={handleClick}>
          Log Out
        </button>
      </div>
    </header>
  )
}

export default Header
