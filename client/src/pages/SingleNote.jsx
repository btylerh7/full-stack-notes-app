import Editor from '../components/Editor'
import Header from '../components/Header'
import '../styles/Dashboard.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { oneNote } from '../features/notes/noteSlice'

function SingleNote() {
  const { id } = useParams()
  console.log(id)
  const { user } = useSelector((state) => state.auth)
  const { currentNote } = useSelector((state) => state.notes)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    dispatch(oneNote(user.token, id))
  }, [])

  return (
    <div className="dashboard">
      <Header active={currentNote} />
      <Editor active={currentNote} />
    </div>
  )
}

export default SingleNote
