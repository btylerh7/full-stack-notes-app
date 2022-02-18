import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Error from './pages/Error'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SingleNote from './pages/SingleNote'
import { useMediaQuery } from 'react-responsive'
import { useState, createContext } from 'react'

export const AppContext = createContext()

function App() {
  const [previewMode, setPreviewMode] = useState(false)
  const isMedium = useMediaQuery({ minWidth: 768 })
  const [currentId, setCurrentId] = useState(null)
  return (
    <AppContext.Provider
      value={{ previewMode, setPreviewMode, isMedium, currentId, setCurrentId }}
    >
      <Router>
        <div className="main container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/notes/:id" element={<SingleNote />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </AppContext.Provider>
  )
}

export default App
