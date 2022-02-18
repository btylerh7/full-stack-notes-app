import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Error from './pages/Error'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SingleNote from './pages/SingleNote'
import { useState, createContext } from 'react'

export const PreviewContext = createContext()

function App() {
  const [previewMode, setPreviewMode] = useState(false)
  return (
    <PreviewContext.Provider value={{ previewMode, setPreviewMode }}>
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
    </PreviewContext.Provider>
  )
}

export default App
