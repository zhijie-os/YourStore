const PORT = 8888
const express = require('express')

const mongoose = require('mongoose')

const app = express()



mongoose.connect('mongodb://127.0.0.1:27017/yourstore', { useNewUrlParser: true })
const db = mongoose.connection

db.once('open', _ => {
    console.log('Database connected')
})

db.on('error', err => {
    console.error('connection error')
})


app.listen(PORT, () => console.log('Server Started.'))