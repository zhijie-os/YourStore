const express = require('express')
const router = express.Router()
const customerDB = require('../models/customer')


// Get a list of customer with pagination
router.get('/',async (req,res)=>
{
    const pageSize = req.query.pageSize 
    const pageNumber = req.query.pageNumber
    
    try {
        // all customer is a list
        const allcustomers = await customerDB.find().limit(pageSize).skip(pageSize*pageNumber)

        // only return the name of the customer
        res.json(allcustomers)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// GET a user with respect to :id
router.get('/:id', getcustomerInstance, (req, res) => {
    res.send(res.customerInstance)
})

// POST a user with respect to the JSON input
router.post('/', async (req, res) => {

    // parse the JSON
    const newcustomer = new customerDB(
        {
            UserName: req.body.UserName,
            Password: req.body.Password,
            Cart:[]
        })
    
        // try if can save the customer
    try {
        const savedcustomer = await newcustomer.save()
        // on success, send back 201
        res.status(200).json(savedcustomer)
    }
    catch (err) {
        // on error, send back error
        res.status(400).json({ message: err.message })
    }
})

// PATCH with respect to :id and the given input
router.patch('/:id', getcustomerInstance, async (req, res) => {

    // change password if any
    res.customerInstance.Password=req.body.Password
    // change cart if any
    res.customerInstance.Card = req.body.Cart

    // try to save back
    try {
        const updatedcustomer = await res.customerInstance.save()
        // successed
        res.status(200).json(updatedcustomer)
    }
    catch (err) {
        // error on our side
        res.status(500).json({ message: 'Failed to update the password' })
    }

})

// DELETE a user with respect to :id
router.delete('/:id', getcustomerInstance, async (req, res) => {

    // try to remove
    try
    {
        await res.customerInstance.remove()
        res.json({message:'Successfully deleted the customer'})
    }
    catch(err)
    {
        res.status(500).json({message:'Failed to delete the customer'})
    }
})



// middleware that finds the customer instance by :id from the database
async function getcustomerInstance(req, res, next) {
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

module.exports = router