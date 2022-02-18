import { useState } from 'react'
import { marked } from 'marked'
import { toast } from 'react-toastify'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useContext } from 'react'
import { PreviewContext } from '../App'
import {
  oneNote,
  updateNote,
  addNote,
  noteReset,
} from '../features/notes/noteSlice'
import { useNavigate } from 'react-router-dom'

function Editor({ id }) {
  const { previewMode } = useContext(PreviewContext)
  const { notes, isError, isLoaded, isAdded, isUpdated, message, currentNote } =
    useSelector((state) => state.notes)
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isMedium = useMediaQuery({ minWidth: 768 })

  useEffect(() => {
    if (id) {
      dispatch(oneNote(id))
    }
  }, [id, dispatch])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isAdded) {
      const newNote = notes.find((note) => note.title === title)
      navigate(`/notes/${newNote._id}`)
      toast.success('Note Added!')
    }
    if (isLoaded) {
      setTitle(currentNote.title)
      setNote(currentNote.note)
    }
    if (isUpdated) {
      toast.success('Note Updated!')
      setTitle(currentNote.title)
      setNote(currentNote.note)
    }

    return () => {
      dispatch(noteReset())
    }
  }, [
    isError,
    isAdded,
    isUpdated,
    currentNote,
    notes,
    message,
    navigate,
    dispatch,
    isLoaded,
    title,
  ])

  const handleCreate = (e) => {
    e.preventDefault()
    // saveNotes(title, note, user.token)
    if (title && note) {
      const noteData = {
        title,
        note,
      }
      dispatch(addNote(noteData))
    }
  }
  const handleSave = (e) => {
    e.preventDefault()
    if (id && title && note) {
      const noteData = {
        id,
        title,
        note,
      }
      dispatch(updateNote(noteData))
      window.location.reload = false
    }
  }
  // MAKE SURE TO UPDATE HTML TO BE SANITIZED //
  return (
    <div className="editor">
      <div
        className={
          !isMedium ? (previewMode ? 'hidden' : 'edit-mode') : undefined
        }
      >
        <form
          onSubmit={id ? handleSave : handleCreate}
          className={'editor-fields'}
        >
          <label htmlFor="title">
            Title: <br />
            <input
              type="text"
              placeholder="Enter a cool title..."
              name="title"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
          </label>
          <label htmlFor="note">
            Note Text:
            <br />
            <textarea
              className="textarea"
              value={note}
              onChange={(e) => {
                setNote(e.target.value)
              }}
            />
          </label>
          <button className="btn" formAction="submit">
            {id ? 'Save Note' : 'Create Note'}
          </button>
        </form>
      </div>
      <div
        className={
          !isMedium ? (previewMode ? 'preview-mode' : 'hidden') : undefined
        }
      >
        <div className={'editor-preview'}>
          <h2>{title}</h2>
          <div
            className="preview"
            dangerouslySetInnerHTML={{ __html: marked(note) }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Editor
