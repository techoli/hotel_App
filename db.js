
const mongoose = require("mongoose")

var mongoURL = 'mongodb+srv://admin:admining@cluster0.7fk3e.mongodb.net/mern-rooms'

mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewURLParser: true })

var connection = mongoose.connection

connection.on('error', () => {
    console.log('Mongodb connection failed')
    
})
connection.on('connected', () => {
    console.log('Mongodb connection success')
})

module.exports = mongoose;