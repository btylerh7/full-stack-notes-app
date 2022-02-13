import { useState } from 'react'
import '../styles/Editor.css'
import { marked } from 'marked'

function Editor() {
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  return (
    <div className="editor container">
      <form className="editor-fields container">
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
      </form>
      <div className="editor-preview container">
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: marked(note) }} />
      </div>
    </div>
  )
}

export default Editor
