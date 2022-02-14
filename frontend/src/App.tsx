import { useContext, useEffect } from 'react'
import { UserContext } from './contexts/userContext'
import Editor from './components/Editor'
import Login from './components/Login'
import Navbar from './components/Navbar'
import './styles/App.css'

function App() {
  const { loggedIn, setLoggedIn, user, setUser } = useContext(UserContext)

  //Checks for previous session on page load
  useEffect(() => {
    const current = window.localStorage.getItem('loggedIn')
    if (current) {
      setLoggedIn(JSON.parse(current))
    }
  }, [])

  //Watches for changes in login state
  useEffect(() => {
    window.localStorage.setItem('loggedIn', JSON.stringify(loggedIn))
  })

  //Checks for User information
  useEffect(() => {
    const currentUser = window.localStorage.getItem('User')
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('User', JSON.stringify(user))
  })

  if (!loggedIn) {
    return (
      <div className="login">
        <Login />
      </div>
    )
  }
  return (
    <div className="App">
      <Navbar />
      <Editor />
    </div>
  )
}

export default App
