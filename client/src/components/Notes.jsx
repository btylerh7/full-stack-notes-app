import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loadNotes, saveNote } from '../features/notes/noteService'

function Notes() {
  const { user } = useSelector((state) => state.auth)
  const [notes, setNotes] = useState([])
  useEffect(() => {
    const load = async () => {
      const currentNotes = await loadNotes(user.token)
      console.log(currentNotes)
      setNotes(currentNotes)
    }
    load()
  }, [user])
  if (notes.length !== 0) {
    console.log(notes)
    notes.map((note) => {
      let url = `/notes/${note.id}/`
      return <Link to={url}>{note.title}</Link>
    })
  }
  return <div>Loading...</div>
}

export default Notes
