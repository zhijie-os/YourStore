const express = require('express')
const router = express.Router()
const sellerDB = require('../models/sellers')
const orderDB = require('../models/orders')
const productDB = require('../models/products')
const { route } = require('./products')


// get seller's orders by UserName
router.get("/:id/orders", getSellerInstance, async (req, res) => {
    try {

        const sellerOrderIDs = res.sellerInstance.Orders;

        let actualOrders;

        actualOrders = await Promise.all(sellerOrderIDs.map(async (orderID) => {
            return orderDB.findOne({ "_id": orderID });
        }));

        let orderInfo;
        orderInfo = await Promise.all(actualOrders.map(async (order)=>{
            let product = await productDB.findOne({"_id":order.Product});

            let status;

            if(!order.Payment)
            {
                status="Unpaid"
            }
            else{
                if(order.Shipped)
                {
                    status="Shipped"
                }
                else{
                    status="Unshipped"
                }
            }

            if(order.Cancelled)
            {
                status="Cancelled";
            }

            return {
                "OrderNumber":order._id,
                "CustomerID":order.CustomerID,
                "ProductName": product.Title,
                "Price":order.Total,
                "ReceiverName":order.ReceiverName,
                "ReceiverAddress":order.ReceiverAddress,
                "Status":status,
                "ShipmentLabel":order.ShipmentLabel
            } 
        }));

        res.json({ Orders: orderInfo });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// get sellers's products
router.get('/:id/products', getSellerInstance, async(req,res)=>{
    try 
    {
        const productIDs = res.sellerInstance.Products;

        let allProducts = await Promise.all(productIDs.map(async (productID)=>{
            let productInstance = await productDB.findOne({"_id":productID});

            return {
                "ProductNumber":productInstance._id,
                "ProductTitle":productInstance.Title,
                "Description":productInstance.Description,
                "Price":productInstance.Price
            }
        }));

        res.json({Products: allProducts});
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
});



// get seller instances
router.get('/', async (req, res) => {
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
            // all seller is a list
            const allSellers = await sellerDB.find().limit(pageSize).skip(pageSize * pageNumber)

            // only return the name of the Seller
            res.json(allSellers)
        }
        catch (err) {

            res.status(500).json({ message: err.message })

        }
    }
})


// GET a user with respect to :id
router.get('/:id', getSellerInstance, (req, res) => {
    res.send(res.sellerInstance)
})

// POST a user with respect to the JSON input
router.post('/', async (req, res) => {

    // parse the JSON
    const newSeller = new sellerDB(
        {
            UserName: req.body.UserName,
            Password: req.body.Password,
            CardNumber: req.body.CardNumber,
            Orders: [],
            Products: []
        })

    // try if can save the seller
    try {
        let alreadyUsed = await sellerDB.findOne({"UserName": req.body.UserName});
 
        if(alreadyUsed!=null){
            res.status(500).json("Seller "+req.body.UserName+" already existed.");
            return;
        }

        await newSeller.save()
        // on success, send back 201
        res.status(200).json("Seller "+req.body.UserName+" has been successfully created");
    }
    catch (err) {
        // on error, send back error
        res.status(400).json({ message: err.message })
    }
})

// PATCH with respect to :id and the given input
router.patch('/:id', getSellerInstance, async (req, res) => {

    if (req.body.Password) {
        // change password if any
        res.sellerInstance.Password = req.body.Password
    }
    else if (req.body.CardNumber) {
        // change card number if any
        res.sellerInstance.CardNumber = req.body.CardNumber
    }


    // try to save back
    try {
        const updatedSeller = await res.sellerInstance.save()
        // successed
        res.status(200).json(updatedSeller)
    }
    catch (err) {
        // error on our side
        res.status(500).json({ message: 'Failed to update the password' })
    }

})

// DELETE a user with respect to :id
router.delete('/:id', getSellerInstance, async (req, res) => {

    // try to remove
    try {
        await res.sellerInstance.remove()
        res.json({ message: 'Successfully deleted the seller' })
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete the seller' })
    }
})



router.delete("/:id/orders", getSellerInstance, async (req, res) => {
    try {

        res.sellerInstance.Orders = []
        await res.sellerInstance.save();


        res.status(200).json({ message:" orders has been deleted..." });

    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }

});


// middleware that finds the seller instance by :id from the database
async function getSellerInstance(req, res, next) {
    let sellerInstance

    try {
        // find seller by Username
        sellerInstance = await sellerDB.findOne({ UserName: req.params.id })
        // if seller not exist, then send error status
        if (sellerInstance == null) {
            return res.status(404).json({ message: 'Cannot find seller' })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.sellerInstance = sellerInstance
    next()
}

module.exports = router