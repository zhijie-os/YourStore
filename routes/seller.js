const express = require('express')
const router = express.Router()
const sellerModel = require('../models/seller')

// Get All Seller
router.get('/', async (req, res) => {
    try {
        // all seller is a list
        const allSellers = await sellerModel.find()

        // only return the name of the Seller
        res.json(allSellers)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// GET a user
router.get('/:id', getSellerInstance, (req, res) => {
    res.send(res.sellerInstance)
})

// POST
router.post('/', async (req, res) => {

    const newSeller = new sellerModel(
        {
            UserName: req.body.UserName,
            Password: req.body.Password,
            CardNumber: req.body.CardNumber
        })

    try {
        const savedSeller = await newSeller.save()
        res.status(201).json(savedSeller)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// PATCH
router.patch('/:id', getSellerInstance, async (req, res) => {

    // change password
    res.sellerInstance.Password=req.body.Password
    res.sellerInstance.CardNumber = req.body.CardNumber
    try {
        const updatedSeller = await res.sellerInstance.save()
        res.status(200).json(updatedSeller)
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to update the password' })
    }

})

// DELETE
router.delete('/:id', getSellerInstance, async (req, res) => {
    try
    {
        await res.sellerInstance.remove()
        res.json({message:'Successfully deleted the seller'})
    }
    catch(err)
    {
        res.status(500).json({message:'Failed to delete the seller'})
    }
})



// middleware that finds the seller instance by :id from the database
async function getSellerInstance(req, res, next) {
    let sellerInstance

    try {
        // find seller by Username
        sellerInstance = await sellerModel.findOne({ UserName: req.params.id })
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