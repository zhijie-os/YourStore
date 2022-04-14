require('dotenv').config();
const bcrypt = require("bcrypt");
const PORT = 8888;
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const cors = require('cors')

app.use(
    cors({
        origin: "*",
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

// middleware to let server to accept json
app.use(express.json());

const customerDB = require('./models/customers')
const sellerDB = require('./models/sellers')
const adminDB = require('./models/admins')



// const createAdmin = async () => {
//     // generate salt to hash password
//     const salt = await bcrypt.genSalt(10);

//     let admin = new adminDB();
//     admin.UserName = "SuperUser";

//     // now we set user password to hashed password
//     admin.Password = await bcrypt.hash("sudo", salt);
//     await admin.save();

//     console.log("saved");
// }

// createAdmin();


app.put('/login', async (req, res) => {

    // check if UserName is given
    if (!req.body.UserName) {
        res.status(400).json({ message: 'UserName is not defined...' })
    } // check if Password is given
    else if (!req.body.Password) {
        res.status(400).json({ message: 'Password is not defined...' })
    }
    else {

        try {
            const username = req.body.UserName;
            const password = req.body.Password;

            let adminInstance;

            adminInstance = await adminDB.findOne({ "UserName": username });
            if (adminInstance != null) {
                const validPassword = await bcrypt.compare(password, adminInstance.Password);
                if (validPassword) {
                    res.json({ "UserName": username, "UserType": "admin" });
                }
                else {
                    res.status(500).json({ message: "Wrong password..." })
                }
                return;
            }

            let customerInstance, sellerInstance;

            // check if the user is customer
            customerInstance = await customerDB.findOne({ "UserName": username });
            if (customerInstance != null) {
                const validPassword = await bcrypt.compare(password, customerInstance.Password);
                if (validPassword) {
                    res.json({ "UserName": username, "UserType": "customer" });
                }
                else {
                    res.status(500).json({ message: "Wrong password..." })
                }
                return;
            }

            // check if the user is seller
            sellerInstance = await sellerDB.findOne({ "UserName": username });
            if (sellerInstance != null) {
                const validPassword = await bcrypt.compare(password, sellerInstance.Password);
                if (validPassword) {
                    res.json({ "UserName": username, "UserType": "seller" });
                }
                else {
                    res.status(500).json({ message: "Wrong password..." })
                }
                return;
            }


            res.status(500).json({ message: "No user find..." })
        }
        catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
});



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

const adminRouter = require('./routes/admins');
app.use('/admins', adminRouter);


app.listen(PORT, () => console.log('Server Started.'));


