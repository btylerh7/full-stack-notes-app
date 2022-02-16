import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { allNotes } from '../features/notes/noteSlice'

function Notes() {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { notes, isIdle } = useSelector((state) => state.notes)

  useEffect(() => {
    if (isIdle && user.token) {
      dispatch(allNotes(user.token))
    }
  }, [isIdle, user])
  console.log(notes)
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
