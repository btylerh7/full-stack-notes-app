import Editor from '../components/Editor'
import Header from '../components/Header'
import '../styles/Dashboard.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function SingleNote() {
  const { id } = useParams()
  const { user } = useSelector((state) => state.auth)
  const { notes } = useSelector((state) => state.notes)
  const [currentNote, setCurrentNote] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    setCurrentNote(() => {
      const note = notes.find((note) => note._id === id)
      if (!note) {
        return {
          title: '',
          note: '',
        }
      }
      return note
    })
  }, [id, notes])

  return (
    <div className="dashboard">
      <Header currentNote={currentNote} />
      <Editor currentNote={currentNote} />
    </div>
  )
}

export default SingleNote
