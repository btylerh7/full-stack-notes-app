import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import UserProvider from './contexts/userContext'
import PostProvider from './contexts/noteContext'

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
