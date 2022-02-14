import { MouseEventHandler, useState } from 'react'
import '../styles/Editor.css'
import { marked } from 'marked'
import { saveNotes } from '../contexts/postFunctions'
import { useContext } from 'react'
import { UserContext } from '../contexts/userContext'

function Editor() {
  const { user } = useContext(UserContext)
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const handleSubmit = (e: any) => {
    e.preventDefault()
    saveNotes(title, note, user.token)
  }
  // MAKE SURE TO UPDATE HTML TO BE SANITIZED //
  return (
    <div className="editor container">
      <form onSubmit={handleSubmit} className="editor-fields container">
        <label htmlFor="title">
          Title:
          <input
            type="text"
            placeholder="A Cool Title..."
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
          <textarea
            className="textarea"
            value={note}
            onChange={(e) => {
              setNote(e.target.value)
            }}
          />
        </label>
        <button className="btn" formAction="submit">
          Save Note
        </button>
      </form>
      <div className="editor-preview container">
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: marked(note) }} />
      </div>
    </div>
  )
}

export default Editor
