const express = require('express')
const router = express.Router()
const orderDB = require('../models/orders')



// GET a list of orders with pagination
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
            // all order is a list
            const allOrders = await orderDB.find().limit(pageSize).skip(pageSize * pageNumber)

            // only return the name of the order
            res.json(allOrders)
        }
        catch (err) {

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
            CustomerID: req.body.CustomerID,
            SellerID: req.body.SellerID,
            Total: req.body.Total,
            ReceiverName: req.body.ReceiverName,
            ReceiverAddress: req.body.ReceiverAddress,
            Payment: false,
            Cancelled: false,
            Shipped: false,
            ShipmentLabel: "None",
            Product: req.body.Product
        })

    // try if can save the order
    try {
        const savedOrder = await newOrder.save()

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
    if (req.body.Payment) {
        res.orderInstance.Payment = req.body.Payment
    }
    else if (req.body.Cancelled) {
        if(res.orderInstance.Cancelled)
        {
            res.status(400).json({ message: "Order is already being cancelled" });
        }

        // change into "cancelled" status
        if (req.body.Cancelled == 'true') {
            res.orderInstance.Cancelled = true;
        }
        else {
            res.status(400).json({ message: "Unrecognized field for body.Cancelled" });
            return;
        }
    }
    else if (req.body.ShipmentLabel) {
        // change into "shipped" status
        res.orderInstance.Shipped = true
        res.orderInstance.ShipmentLabel = req.body.ShipmentLabel
    }
    else {
        res.status(500).json({ message: "Please Provide Fields to be updated" })
        return;
    }


    // try to save back
    try {
        const updatedOrder = await res.orderInstance.save()
        // successed
        res.status(200).json(updatedOrder)
    }
    catch (err) {
        // error on our side
        res.status(500).json({ message: 'Failed to update anything.' })
    }

})

// DELETE an order with respect to :id
router.delete('/:id', getOrderInstance, async (req, res) => {

    // try to remove
    try {
        await res.orderInstance.remove()
        res.json({ message: 'Successfully deleted the order' })
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete the order' })
    }
})


router.delete('/', async (req, res) => {

    // try to remove
    try {
        await orderDB.remove({});
        res.json({ message: 'All orders deleted...' })
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete the order' })
    }
})



// middleware that finds the order instance by :id from the database
async function getOrderInstance(req, res, next) {
    let orderInstance

    try {
        // find order by Username
        orderInstance = await orderDB.findOne({ "_id": req.params.id })
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