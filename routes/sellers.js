const express = require('express')
const router = express.Router()
const sellerDB = require('../models/sellers')


router.get('/',async (req,res)=>
{
    try {
        const pageSize = req.query.pageSize 
        const pageNumber = req.query.pageNumber
        // all seller is a list
        const allSellers = await sellerDB.find().limit(pageSize).skip(pageSize*pageNumber)

        // only return the name of the Seller
        res.json(allSellers)
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
            CardNumber: req.body.CardNumber
        })
    
        // try if can save the seller
    try {
        const savedSeller = await newSeller.save()
        // on success, send back 201
        res.status(200).json(savedSeller)
    }
    catch (err) {
        // on error, send back error
        res.status(400).json({ message: err.message })
    }
})

// PATCH with respect to :id and the given input
router.patch('/:id', getSellerInstance, async (req, res) => {

    if(req.body.Password)
    {
        // change password if any
        res.sellerInstance.Password=req.body.Password
    }
    else if(req.body.CardNumber)
    {
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