import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../styles/Header.css'
import { allNotes } from '../features/notes/noteSlice'

function Notes({ id }) {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { notes } = useSelector((state) => state.notes)

  useEffect(() => {
    dispatch(allNotes())
  }, [dispatch])
  return (
    <>
      <p>Notes</p>
      {notes?.map((note) => {
        let url = `/notes/${note._id}`
        return (
          <Link
            className={note._id === id ? 'navlink active' : 'navlink'}
            key={note._id}
            to={url}
          >
            {note.title}
          </Link>
        )
      })}
    </>
  )
}

export default Notes
