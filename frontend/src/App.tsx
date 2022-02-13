import { useContext } from 'react'
import { UserContext } from './contexts/userContext'
import Editor from './components/Editor'
import Login from './components/Login'
import Navbar from './components/Navbar'
import './styles/App.css'

function App() {
  const { loggedIn } = useContext(UserContext)

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
