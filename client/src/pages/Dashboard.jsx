import Editor from '../components/Editor'
import Header from '../components/Header'
import '../styles/Dashboard.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
function Dashboard() {
  const { user } = useSelector((state) => state.auth)

  return (
    <>
      <Header />
      <Editor />
    </>
  )
}

export default Dashboard
