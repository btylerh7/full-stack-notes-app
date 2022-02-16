import { useState } from 'react'
import { marked } from 'marked'
import { useSelector } from 'react-redux'
// import { saveNotes } from '../contexts/postFunctions'
// import { useContext } from 'react'
// import { UserContext } from '../contexts/userContext'

function Editor() {
  const { user } = useSelector((state) => state.auth)
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    // saveNotes(title, note, user.token)
  }
  // MAKE SURE TO UPDATE HTML TO BE SANITIZED //
  return (
    <div className="editor container">
      <form onSubmit={handleSubmit} className="editor-fields container">
        <label htmlFor="title">
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
        <div dangerouslySetInnerHTML={{ __html: marked(note) }}></div>
      </div>
    </div>
  )
}

export default Editor
