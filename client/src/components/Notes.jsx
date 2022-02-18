import { useState, useEffect } from 'react'
import { FaTimesCircle } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../styles/Header.css'
import { allNotes, deleteNote } from '../features/notes/noteSlice'

function Notes({ id }) {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { notes, isUpdated, isDeleted, isAdded } = useSelector(
    (state) => state.notes
  )

  useEffect(() => {
    dispatch(allNotes())

    if (isDeleted) {
      toast.success('Note Deleted!')
      navigate('/')
    }
  }, [dispatch, isUpdated, isAdded, isDeleted])

  const handleDelete = (e, id) => {
    e.preventDefault()
    dispatch(deleteNote(id))
  }
  return (
    <>
      {notes?.map((note) => {
        let url = `/notes/${note._id}`
        return (
          <Link
            className={
              note._id === id
                ? 'navlink active flex-2-items'
                : 'navlink flex-2-items'
            }
            key={note._id}
            to={url}
          >
            {note.title}

            <FaTimesCircle
              onClick={(e) => {
                handleDelete(e, note._id)
              }}
              className="pointer"
            />
          </Link>
        )
      })}
    </>
  )
}

export default Notes
