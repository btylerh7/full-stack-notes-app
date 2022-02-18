import { FaPlusCircle, FaBars, FaEdit, FaTabletAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import Notes from './Notes'
import '../styles/Header.css'
import { useState, useContext } from 'react'
import { AppContext } from '../App'

function Header({ id }) {
  const [clicked, setClicked] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isMedium = useMediaQuery({ minWidth: 768 })
  const { previewMode, setPreviewMode } = useContext(AppContext)

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
        {!isMedium && previewMode ? (
          <FaEdit onClick={() => setPreviewMode(previewMode ? false : true)} />
        ) : (
          <FaTabletAlt
            onClick={() => setPreviewMode(previewMode ? false : true)}
          />
        )}
      </div>
      <br />
      <div className={!isMedium && !clicked ? 'hidden' : undefined}>
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
