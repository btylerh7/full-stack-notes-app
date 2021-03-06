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

export const updateNote = async (id, title, note, token) => {
  let userToken = `Bearer ${token}`
  const config = {
    headers: {
      authorization: userToken,
      'Content-Type': 'application/json',
    },
  }
  try {
    const response = await axios.put(
      `/api/notes/${id}`,
      {
        title: title,
        note: note,
      },
      config
    )
    return response.data
  } catch {
    alert('Error: note not updated')
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

export const deleteNote = async (id, token) => {
  let userToken = `Bearer ${token}`
  const config = {
    headers: {
      authorization: userToken,
      'Content-Type': 'application/json',
    },
  }
  try {
    const response = await axios.delete(`/api/notes/${id}`, config)
    return response.data
  } catch {
    alert('Error: note not updated')
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
    const loadedNote = notes.data
    return loadedNote
  } catch {
    alert('Error: Single Note not found')
  }
}

const noteService = {
  deleteNote,
  addNote,
  updateNote,
  loadNotes,
  loadSingleNote,
}

export default noteService
