import axios from 'axios'
import React, { useState, useEffect, createContext } from 'react'
import { loadNotes } from './postFunctions'

export const PostContext = createContext<any>({})

const defaultState = [
  {
    title: '',
    note: '',
  },
]

const PostProvider: React.FC = ({ children }: any) => {
  const [allPosts, setAllPosts] = useState(defaultState)
  return (
    <PostContext.Provider value={{ allPosts, setAllPosts }}>
      {children}
    </PostContext.Provider>
  )
}

export default PostProvider
