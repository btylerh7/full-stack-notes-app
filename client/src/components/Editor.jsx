import { useState } from 'react'
import { marked } from 'marked'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addNote } from '../features/notes/noteService'
import { useNavigate } from 'react-router-dom'

function Editor({ currentNote }) {
  const { user } = useSelector((state) => state.auth)
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title)
      setNote(currentNote.note)
    }
  }, [currentNote])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // saveNotes(title, note, user.token)
    if (!currentNote) {
      await dispatch(addNote(title, note, user.token))
      navigate(`/notes/${note._id}`)
    }
  }
  // MAKE SURE TO UPDATE HTML TO BE SANITIZED //
  return (
    <div className="editor">
      <form onSubmit={handleSubmit} className="editor-fields ">
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
          {currentNote ? 'Save Note' : 'Create Note'}
        </button>
      </form>
      <div className="editor-preview ">
        {title ? <h2>{title}</h2> : <h2></h2>}
        {note ? (
          <div dangerouslySetInnerHTML={{ __html: marked(note) }}></div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default Editor
