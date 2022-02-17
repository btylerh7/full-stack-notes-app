import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Error from './pages/Error'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import SingleNote from './pages/SingleNote'

function App() {
  const { user } = useSelector((state) => state.auth)
  return (
    <>
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
    </>
  )
}

export default App
