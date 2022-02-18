import Editor from '../components/Editor'
import Header from '../components/Header'
import '../styles/Dashboard.css'
import { useState, useEffect } from 'react'
import MediaQuery from 'react-responsive'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Dashboard() {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  })

  return (
    <div className="dashboard">
      <MediaQuery minWidth={768}>
        <Header />
      </MediaQuery>

      <Editor />
    </div>
  )
}

export default Dashboard
