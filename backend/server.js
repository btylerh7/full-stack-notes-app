const express = require('express')
const connectDb = require('./config/db')
const dotenv = require('dotenv').config()
const path = require('path')

//Set up app connections
const app = express()
connectDb()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Set up note routes
app.use('/api/notes', require('./routes/noteRoutes'))

//Set up user routes
app.use('/api/users', require('./routes/userRoutes'))

// Show frontend pages

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  })
} else {
  app.get('/', (req, res) => {
    res.send('please set environment to production')
  })
}

//Start server
app.listen(process.env.PORT || 5000, () => {
  console.log('server is listening...')
})
