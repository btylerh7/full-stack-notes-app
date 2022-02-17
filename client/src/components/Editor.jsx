import { useState } from 'react'
import { marked } from 'marked'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addNote, noteReset } from '../features/notes/noteSlice'
import { useNavigate } from 'react-router-dom'

function Editor({ currentNote, id }) {
  const { user } = useSelector((state) => state.auth)
  const { notes, isSuccess, isError, message } = useSelector(
    (state) => state.notes
  )
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (id && currentNote.title) {
      setTitle(currentNote.title)
      setNote(currentNote.note)
    }
  }, [id, currentNote])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess && note !== '') {
      const newNote = notes.find((note) => note.title === title)
      navigate(`/notes/${newNote._id}`)
    }
    return () => {
      dispatch(noteReset())
    }
  }, [isError, notes, isSuccess, message, navigate, dispatch])

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
  const handleSave = () => {}
  // MAKE SURE TO UPDATE HTML TO BE SANITIZED //
  return (
    <div className="editor">
      <form
        onSubmit={id ? handleSave : handleCreate}
        className="editor-fields "
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
      <div className="editor-preview ">
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: marked(note) }}></div>
      </div>
    </div>
  )
}

export default Editor
