import axios from 'axios'

export async function saveNotes(title: string, note: string, token: string) {
  const userToken = `Bearer ${token}`
  const config = {
    headers: {
      authorization: userToken,
      'Content-Type': 'application/json',
    },
  }
  console.log(title, note, token)
  try {
    await axios.post(
      '/api/notes',
      {
        title: title,
        note: note,
      },
      config
    )
    return alert('Note Saved')
  } catch {
    alert('Error: note not saved')
  }
}

export async function loadNotes(token: string) {
  const userToken = `Bearer ${token}`
  const config = {
    headers: {
      authorization: userToken,
      'Content-Type': 'application/json',
    },
  }
  try {
    const notes = await axios.get('/api/notes', config)
    return notes
  } catch {
    alert('Error: Notes not found')
  }
}
