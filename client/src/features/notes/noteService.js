import axios from 'axios'

export const addNote = async (title, note, token) => {
  let userToken = `Bearer ${token}`
  const config = {
    headers: {
      authorization: userToken,
      'Content-Type': 'application/json',
    },
  }
  try {
    const response = await axios.post(
      '/api/notes',
      {
        title: title,
        note: note,
      },
      config
    )
    return response.data
  } catch {
    alert('Error: note not saved')
  }
}

export const loadNotes = async (token) => {
  let userToken = `Bearer ${token}`
  const config = {
    headers: {
      authorization: userToken,
      'Content-Type': 'application/json',
    },
  }
  try {
    const notes = await axios.get('/api/notes', config)
    const loadedNotes = notes.data.allNotes
    return loadedNotes
  } catch {
    alert('Error: Notes not found')
  }
}

export const loadSingleNote = async (token, id) => {
  let userToken = `Bearer ${token}`
  const config = {
    headers: {
      authorization: userToken,
      'Content-Type': 'application/json',
    },
  }
  try {
    const notes = await axios.get(`/api/notes/${id}`, config)
    const loadedNote = notes.data.note
    return loadedNote
  } catch {
    alert('Error: Single Note not found')
  }
}

const noteService = {
  addNote,
  loadNotes,
  loadSingleNote,
}

export default noteService
