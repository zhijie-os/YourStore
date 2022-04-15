require('dotenv').config();


const express = require('express')
const router = express.Router()
const customerDB = require('../models/customers')
const productDB = require('../models/products')
const orderDB = require('../models/orders')
const sellerDB = require('../models/sellers')
const bcrypt = require("bcrypt");


const jwt = require("jsonwebtoken");
// get customer's orders by UserName
router.get("/:id/orders", authenticateToken, getCustomerInstance, async (req, res) => {
    if (req.user.UserName != res.customerInstance.UserName
        && req.user.UserType != "admin") {
        res.status(403).json({ message: "Permission required..." });
        return;
    }


    try {

        const customerOrderIDs = res.customerInstance.Orders;

        let actualOrders;

        actualOrders = await Promise.all(customerOrderIDs.map(async (orderID) => {
            return orderDB.findOne({ "_id": orderID });
        }));

        let orderInfo;
        orderInfo = await Promise.all(actualOrders.map(async (order) => {
            let product = await productDB.findOne({ "_id": order.Product });

            let status;

            if (!order.Payment) {
                status = "Unpaid"
            }
            else {
                if (order.Shipped) {
                    status = "Shipped"
                }
                else {
                    status = "Unshipped"
                }
            }

            if (order.Cancelled) {
                status = "Cancelled";
            }

            return {
                "OrderNumber": order._id,
                "SellerID": order.SellerID,
                "ProductName": product.Title,
                "Price": order.Total,
                "ReceiverName": order.ReceiverName,
                "ReceiverAddress": order.ReceiverAddress,
                "Status": status,
                "ShipmentLabel": order.ShipmentLabel
            }
        }));

        res.json({ Orders: orderInfo });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});







// get user Cart by UserName
router.get("/:id/cart", authenticateToken,getCustomerInstance, async (req, res) => {
    if (req.user.UserName != res.customerInstance.UserName
        && req.user.UserType != "admin") {
        res.status(403).json({ message: "Permission required..." });
        return;
    }
    
    
    try {
        const cart = res.customerInstance.Cart;

        let total = 0;

        let products = await Promise.all(cart.map(async (productID) => {
            const product = await productDB.findOne({ "_id": productID });
            return product;
        }));

        // console.log(products);
        products.map((product) => {
            total += product.Price;
        });

        res.json({ products: products, total: (Math.round(total * 100) / 100).toFixed(2) });

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});


// add one product into customer's cart
router.patch("/:id/cart", authenticateToken, getCustomerInstance, async (req, res) => {
    if (req.user.UserName != res.customerInstance.UserName
        && req.user.UserType != "admin") {
        res.status(403).json({ message: "Permission required..." });
        return;
    }


    try {

        // console.log(req.body);
        if (!req.body.ProductID) {

            res.status(400).json({ message: "Product ID needed to add  the product into the cart..." });

            return;
        }

        res.customerInstance.Cart.push(req.body.ProductID);

        await res.customerInstance.save()

        res.status(200).json({ message: req.body.ProductID + " has been added..." });

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});


router.delete("/:id/cart", authenticateToken, getCustomerInstance, async (req, res) => {

    if (req.user.UserName != res.customerInstance.UserName
        && req.user.UserType != "admin") {
        res.status(403).json({ message: "Permission required..." });
        return;
    }


    try {
        // console.log(req.body);
        if (!req.body.ProductID) {
            res.status(404).json({ message: "Product ID needed to remove the product from the cart..." });
            return;
        }

        // delete one instance of the product
        var index = res.customerInstance.Cart.indexOf(req.body.ProductID);
        if (index != -1) {
            res.customerInstance.Cart.splice(index, 1);
        }


        // save back
        await res.customerInstance.save()

        res.status(200).json({ message: req.body.ProductID + " has been deleted..." });

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.delete("/:id/orders",authenticateToken, getCustomerInstance, async (req, res) => {

    if (req.user.UserName != res.customerInstance.UserName
        && req.user.UserType != "admin") {
        res.status(403).json({ message: "Permission required..." });
        return;
    }


    try {

        res.customerInstance.Orders = []
        await res.customerInstance.save();


        res.status(200).json({ message: " orders has been deleted..." });

    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }

});





router.put("/:id/createOrder", authenticateToken, getCustomerInstance, async (req, res) => {
    if (req.user.UserName != res.customerInstance.UserName
        && req.user.UserType != "admin") {
        res.status(403).json({ message: "Permission required..." });
        return;
    }


    if (!req.body.ReceiverName) {
        res.status(400).json({ message: "ReceiverName needed to create orders..." });
    }
    else if (!req.body.ReceiverAddress) {
        res.status(400).json({ message: "ReceiverAddress needed to create orders..." });
    }
    else if (!req.body.Products) {
        res.status(400).json({ message: "Products needed to create orders..." });
    }
    else {
        try {


            let outOfStock = false;

            // create orders
            for (const product of req.body.Products) {



                // decrease Inventory
                let productInstance;
                productInstance = await productDB.findOne({ "_id": product._id });
                if (productInstance.Inventory > 0) {

                    productInstance.Inventory = productInstance.Inventory - 1;
                    await productInstance.save();
                }
                else {
                    outOfStock = true;
                    continue;
                }



                let newOrder = new orderDB(
                    {
                        CustomerID: req.params.id,
                        SellerID: product.SellerID,
                        Total: product.Price,
                        ReceiverName: req.body.ReceiverName,
                        ReceiverAddress: req.body.ReceiverAddress,
                        Payment: false,
                        Cancelled: false,
                        Shipped: false,
                        ShipmentLabel: "None",
                        Product: product._id
                    });

                //  1
                await newOrder.save();

                // 2
                res.customerInstance.Orders.push(newOrder._id);
                await res.customerInstance.save();



                // decrease Inventory
                let sellerInstance;
                sellerInstance = await sellerDB.findOne({ "UserName": product.SellerID })
                sellerInstance.Orders.push(newOrder._id)
                await sellerInstance.save();

            }

            // clear the cart
            res.customerInstance.Cart = [];
            await res.customerInstance.save();

            if (outOfStock) {
                res.json({ message: "Some products are failed to make the order, please check your orders to review..." })
            }
            else {

                res.json({ message: "Orders created successfully" });
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }

});

// Get a list of customer with pagination
router.get('/', authenticateToken, async (req, res) => {

    if (req.user.UserType != "admin") {
        res.status(403).json({ message: "Permission required..." });
        return;
    }

    if (!req.query.pageSize) {
        res.status(400).json({ message: 'pageSize is not defined...' })
    }
    else if (!req.query.pageNumber) {
        res.status(400).json({ message: 'pageNumber is not defined...' })
    }
    else {
        try {

            const pageSize = req.query.pageSize
            const pageNumber = req.query.pageNumber
            // all customer is a list
            const allCustomers = await customerDB.find().limit(pageSize).skip(pageSize * pageNumber)

            // only return the name of the customer
            res.json(allCustomers)
        }
        catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
})

// GET a user with respect to :id
router.get('/:id', authenticateToken, getCustomerInstance, (req, res) => {
    if (req.user.UserName != res.customerInstance.UserName
        && req.user.UserType != "admin") {
        res.status(403).json({ message: "Permission required..." });
        return;
    }
    res.send(res.customerInstance)
})

// POST a user with respect to the JSON input
router.post('/', async (req, res) => {

    // parse the JSON
    const newcustomer = new customerDB(
        {               // parse JSON
            UserName: req.body.UserName,
            Password: req.body.Password,
            Cart: []
        })

        
    // try if can save the customer
    try {
        let alreadyUsed = await customerDB.findOne({ "UserName": req.body.UserName });

        if (alreadyUsed != null) {
            res.status(500).json({ message: "Customer " + req.body.UserName + " already existed." });
            return;
        }
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        newcustomer.Password = await bcrypt.hash(newcustomer.Password, salt);

        await newcustomer.save()
        // on success, send back 201
        res.status(200).json({ message: "Customer " + req.body.UserName + " has been successfully created" });
    }
    catch (err) {
        // on error, send back error
        res.status(400).json({ message: err.message })
    }
})

// PATCH with respect to :id and the given input
router.patch('/:id', authenticateToken, getCustomerInstance, async (req, res) => {
    if (req.user.UserName != res.customerInstance.UserName
        && req.user.UserType != "admin") {
        res.status(403).json({ message: "Permission required..." });
        return;
    }

    if (req.body.Password) {
        // change password if any
        res.customerInstance.Password = req.body.Password
    }
    else if (req.body.Cart) {
        // change cart if any
        res.customerInstance.Card = req.body.Cart
    }


    // try to save back
    try {
        const updatedCustomer = await res.customerInstance.save()
        // successed
        res.status(200).json(updatedCustomer)
    }
    catch (err) {
        // error on our side
        res.status(500).json({ message: 'Failed to update the password' })
    }

})

// DELETE a user with respect to :id
router.delete('/:id', authenticateToken, getCustomerInstance, async (req, res) => {
    if (req.user.UserName != res.customerInstance.UserName
        && req.user.UserType != "admin") {
        res.status(403).json({ message: "Permission required..." });
        return;
    }


    // try to remove
    try {
        await res.customerInstance.remove()
        res.json({ message: 'Successfully deleted the customer' })
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete the customer' })
    }
})


// middleware that finds the customer instance by :id from the database
async function getCustomerInstance(req, res, next) {
    let customerInstance

    try {
        // find customer by Username
        customerInstance = await customerDB.findOne({ UserName: req.params.id })
        // if customer not exist, then send error status
        if (customerInstance == null) {
            return res.status(404).json({ message: 'Cannot find customer' })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.customerInstance = customerInstance
    next()
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }


    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}


module.exports = router