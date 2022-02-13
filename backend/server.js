const express = require('express')
const connectDb = require('./config/db')
const dotenv = require('dotenv').config()

//Set up app connections
const app = express()
connectDb()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Set up note routes
app.use('/api/notes', require('./routes/noteRoutes'))

//Set up user routes
app.use('/api/users', require('./routes/userRoutes'))

//Start server
app.listen(process.env.PORT || 5000, () => {
  console.log('server is listening...')
})
