const express = require('express')
const router = express.Router()
const orderDB = require('../models/order')

let OrderCount=0;

// GET a list of orders with pagination
router.get('/',async (req,res)=>
{

    if(pageSize)

    try {
        const pageSize = req.query.pageSize 
        const pageNumber = req.query.pageNumber
        // all order is a list
        const allOrders = await orderDB.find().limit(pageSize).skip(pageSize*pageNumber)

        // only return the name of the order
        res.json(allOrders)
    }
    catch (err) {
        if(!req.query.pageSize)
        {
            res.status(400).json({message:'pageSize is not defined...'})
        }
        else if(!req.query.pageNumber)
        {
            res.status(400).json({message:'pageNumber is not defined...'})
        }
        else 
        {
            res.status(500).json({ message: err.message })
        }
    }
})


// GET an order with respect to :id
router.get('/:id', getOrderInstance, (req, res) => {
    res.send(res.orderInstance)
})

// POST an order with respect to the JSON input
router.post('/', async (req, res) => {

    // parse the JSON
    const newOrder = new orderDB(
        {
            OrderID:"order"+OrderCount,
            CustomerID: req.body.CustomerID,
            SellerID: req.body.SellerID,
            Total: req.body.CardNumber,
            ReceiverName: req.body.ReceiverName,
            ReceiverAddress: req.body.ReceiverAddress,
            Payment:false,
            Cancelled:false,
            Shipped:false,
            ShipementLabel:null,
            Products:req.body.Products
        })
    
        // try if can save the order
    try {
        const savedOrder = await newOrder.save()
        OrderCount+=1
        // on success, send back 201
        res.status(200).json(savedOrder)
    }
    catch (err) {
        // on error, send back error
        res.status(400).json({ message: err.message })
    }
})

// PATCH with respect to :id and the given input
router.patch('/:id', getOrderInstance, async (req, res) => {

    // change into "paid" status
    res.orderInstance.Payment=req.body.Payment
    // change into "cancelled" status
    res.orderInstance.Cancelled = req.body.Cancelled 
    // change into "shipped" status
    res.orderInstance.Shipped = req.body.Shipped

    // try to save back
    try {
        const updatedOrder = await res.orderInstance.save()
        // successed
        res.status(200).json(updatedOrder)
    }
    catch (err) {
        // error on our side
        res.status(500).json({ message: 'Failed to update the password' })
    }

})

// DELETE an order with respect to :id
router.delete('/:id', getOrderInstance, async (req, res) => {

    // try to remove
    try
    {
        await res.orderInstance.remove()
        res.json({message:'Successfully deleted the order'})
    }
    catch(err)
    {
        res.status(500).json({message:'Failed to delete the order'})
    }
})



// middleware that finds the order instance by :id from the database
async function getOrderInstance(req, res, next) {
    let orderInstance

    try {
        // find order by Username
        orderInstance = await orderDB.findOne({ UserName: req.params.id })
        // if order not exist, then send error status
        if (orderInstance == null) {
            return res.status(404).json({ message: 'Cannot find order' })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.orderInstance = orderInstance
    next()
}

module.exports = router