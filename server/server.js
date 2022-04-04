require('dotenv').config();

const PORT = 8888;
const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', _ => {
    console.log('Database connected');
});

db.on('error', err => {
    console.error(err);
});

// middleware to let server to accept json
app.use(express.json());


const sellerRouter = require('./routes/sellers');
app.use('/sellers', sellerRouter);

const customerRouter = require('./routes/customers');
app.use('/customers', customerRouter);

const orderRouter = require('./routes/orders');
app.use('/orders', orderRouter);

const productRouter = require('./routes/products');
app.use('/products', productRouter);

const categoryRouter = require('./routes/categories');
app.use('/categories', categoryRouter);

app.listen(PORT, () => console.log('Server Started.'));


