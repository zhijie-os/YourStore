require('dotenv').config()

const PORT = 8888
const express = require('express')
const app = express()
const mongoose = require('mongoose')


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

db.once('open', _ => {
    console.log('Database connected')
})

db.on('error', err => {
    console.error(err)
})

// middleware to let server to accept json
app.use(express.json())


const sellerRouter = require('./routes/seller')
app.use('/seller', sellerRouter)

const customerRouter = require('./routes/customer')
app.use('/customer', customerRouter)

const orderRouter = require('./routes/order')
app.use('/order', orderRouter)



app.listen(PORT, () => console.log('Server Started.'))


