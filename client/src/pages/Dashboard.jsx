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
      <Header />
      <Editor />
    </div>
  )
}

export default Dashboard
