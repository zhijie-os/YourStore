const express = require('express')
const router = express.Router()
const productDB = require('../models/products')


router.get('/',async (req,res)=>
{
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
        try {
        
            const pageSize = req.query.pageSize 
            const pageNumber = req.query.pageNumber
            // all product is a list
            const allProducts = await productDB.find().limit(pageSize).skip(pageSize*pageNumber)
    
            res.json(allProducts)
        }
        catch (err) {
    
                res.status(500).json({ message: err.message })
    
        }
    }
})


// GET a user with respect to :id
router.get('/:id', getProductInstance, (req, res) => {
    res.send(res.productInstance)
})

// POST a product with respect to the JSON input
router.post('/', async (req, res) => {

    // parse the JSON
    const newProduct = new productDB(
        {
            SellerID:req.body.SellerID,
            Title:req.body.Title,
            Price:req.body.Price,
            Description:req.body.Description,
            SearchKeys:req.body.SearchKeys
        })

    try {
        const savedproduct = await newProduct.save()
        // on success, send back 201
        res.status(200).json(savedproduct)
    }
    catch (err) {
        // on error, send back error
        res.status(400).json({ message: err.message })
    }
})

// PATCH with respect to :id and the given input
router.patch('/:id', getProductInstance, async (req, res) => {

    // try to save back
    try {
        const updatedProduct = await res.productInstance.save()
        // successed
        res.status(200).json(updatedProduct)
    }
    catch (err) {
        // error on our side
        res.status(500).json({ message: 'Failed to update the password' })
    }

})

// DELETE a user with respect to :id
router.delete('/:id', getProductInstance, async (req, res) => {

    // try to remove
    try
    {
        await res.productInstance.remove()
        res.json({message:'Successfully deleted the product'})
    }
    catch(err)
    {
        res.status(500).json({message:'Failed to delete the product'})
    }
})



// middleware that finds the product instance by :id from the database
async function getProductInstance(req, res, next) {
    let productInstance

    try {
        // find product by Username
        productInstance = await productDB.findOne({ UserName: req.params.id })
        // if product not exist, then send error status
        if (productInstance == null) {
            return res.status(404).json({ message: 'Cannot find product' })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.productInstance = productInstance
    next()
}

module.exports = router