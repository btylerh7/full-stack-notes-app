import axios from 'axios'
import React, { useState, useEffect, createContext } from 'react'

interface User {
  email: string
  password: string
  token?: string
}

export const UserContext = createContext<any>({})

const UserProvider: React.FC = ({ children }: any) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  return (
    <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider

export async function saveNotes(title: string, note: string) {
  try {
    await axios.post('/api/notes', {
      title: title,
      note: note,
    })
    return alert('Note Saved')
  } catch {
    alert('Error: note not saved')
  }
}

export async function logIn(email: string, password: string) {
  try {
    const login = await axios.post('/api/users/login', {
      email: email,
      password: password,
    })
    console.log(login)
  } catch {
    return alert('error, was not able to log in')
  }
}
