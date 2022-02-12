const mongoose = require('mongoose')

const connectDb = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(result => {
        console.log("mongoose connected")
    })
    .catch(err => {
        console.log(err)
        process.exit(1)
    })
}


module.exports = connectDb