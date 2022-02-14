import { useContext, useEffect } from 'react'
import { UserContext } from './contexts/userContext'
import Editor from './components/Editor'
import Login from './components/Login'
import Navbar from './components/Navbar'
import './styles/App.css'

function App() {
  useEffect(() => {
    const current = window.localStorage.getItem('loggedIn')
    if (current) {
      console.log(current)
      setLoggedIn(JSON.parse(current))
    }
  }, [])
  const { loggedIn, setLoggedIn } = useContext(UserContext)
  useEffect(() => {
    window.localStorage.setItem('loggedIn', JSON.stringify(loggedIn))
  })

  if (!loggedIn) {
    return <Login />
  }
  return (
    <div className="App">
      <Navbar />
      <Editor />
    </div>
  )
}

export default App
