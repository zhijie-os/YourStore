require('dotenv').config();

const PORT = 8888;
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const cors = require('cors')

app.use(
    cors({
        origin:"*",
    })
)

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', _ => {
    console.log('Database connected');
});

db.on('error', err => {
    console.error(err);
});


const customerDB = require('./models/customers')
const sellerDB = require('./models/sellers')

app.get('/login', async (req, res)=>{
    if (!req.query.UserName) {
        res.status(400).json({ message: 'UserName is not defined...' })
    }
    else if (!req.query.Password) {
        res.status(400).json({ message: 'Password is not defined...' })
    }
    else {
        try {
            const username = req.query.UserName
            const password = req.query.Password
            // all product is a list
            

            let customerInstance, sellerInstance;
            
            customerInstance = await customerDB.findOne({ "UserName": username });
            if(customerInstance!=null)
            {
                if(password===customerInstance.Password)
                {
                    res.json({"UserName":username,"UserType":"Customer"});
                }
                else 
                {
                    res.status(500).json({ message: "Wrong password..." })
                }
                return;
            }


            sellerInstance = await sellerDB.findOne({ "UserName": username });
            if(sellerInstance!=null)
            {
                if(password===sellerInstance.Password)
                {
                    res.json({"UserName":username,"UserType":"Seller"});
                }
                else 
                {
                    res.status(500).json({ message: "Wrong password..."})
                }
                return;
            }


            res.status(500).json({ message: "No user find..." })
        }
        catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
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


