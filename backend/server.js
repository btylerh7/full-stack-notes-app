const { urlencoded } = require('express')
const express = require('express')
const connectDb = require('./config/db')
require('dotenv').config()

const app = express()
connectDb()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/api/notes', require('./routes/noteRoutes'))

app.listen(process.env.PORT || 3000, () => {
    console.log("server is listening...")
})