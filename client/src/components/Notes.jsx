import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { allNotes } from '../features/notes/noteSlice'

function Notes() {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { notes } = useSelector((state) => state.notes)

  useEffect(() => {
    dispatch(allNotes(user.token))
  }, [])
  return (
    <>
      <p>Notes</p>
      {notes.map((note) => {
        let url = `/notes/${note.id}`
        return <Link to={url}>{note.title}</Link>
      })}
    </>
  )
}

export default Notes
