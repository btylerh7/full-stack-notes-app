import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../contexts/userContext'
import { loadNotes } from '../contexts/postFunctions'
import { notStrictEqual } from 'assert'
import { PostContext } from '../contexts/noteContext'
import { load } from 'dotenv'

function Navbar() {
  const { setLoggedIn, user, setUser } = useContext(UserContext)
  const { allPosts, setAllPosts } = useContext(PostContext)
  const handleLogOut = () => {
    setLoggedIn(false)
    setUser({
      name: '',
      email: '',
      token: '',
    })
  }
  useEffect(() => {
    loadNotes(user.token).then((result) => {
      setAllPosts(result?.data.allNotes)
    })
  })
  return (
    <nav className="container">
      {allPosts.map((note: any) => {
        return (
          <div>
            <p>{note.title}</p>
          </div>
        )
      })}
      <div>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </nav>
  )
}

export default Navbar
