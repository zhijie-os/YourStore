const express = require('express')
const router = express.Router()
const productDB = require('../models/products')
const categoryDB =require('../models/categories')
const sellerDB = require('../models/sellers')


router.get('/', async (req, res) => {
    if (!req.query.pageSize) {
        res.status(400).json({ message: 'pageSize is not defined...' })
    }
    else if (!req.query.pageNumber) {
        res.status(400).json({ message: 'pageNumber is not defined...' })
    }
    else if (!req.query.searchKey) {
        res.status(400).json( { message: 'searchKey is not defined'});
    }
    else if (!req.query.category){
        res.status(400).json({ message: 'category err'});
    }
    else {
        try {
            const pageSize = req.query.pageSize;
            const pageNumber = req.query.pageNumber;
            const searchKey = req.query.searchKey;
            const category = req.query.category;
            console.log(pageSize,pageNumber,searchKey,category);

            let allProducts;
            if(category!="null")
            {
                allProducts = await categoryDB.findOne({"Title":category});
                allProducts = allProducts.Products;

                allProducts = await Promise.all(allProducts.map(async (productID) => {
                    const product = await productDB.findOne({"_id":productID});
                    return product;
                }));
            }
            else 
            {
                // no specified category
                allProducts = await productDB.find(); 
            }

            if(searchKey!="null")
            {
                allProducts = allProducts.filter((product)=>{
                    return product.Title==searchKey || product.SearchKeys.includes(searchKey);
                })
            }

            // allProducts = allProducts.slice(pageSize*pageNumber,pageSize*(pageNumber+1));
            // all product is a list
            //const allProducts = await productDB.find().limit(pageSize).skip(pageSize * pageNumber)
            console.log("returning.....\n"+allProducts);
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
            SellerID: req.body.SellerID,
            Title: req.body.Title,
            Price: req.body.Price,
            Description: req.body.Description,
            SearchKeys: req.body.SearchKeys,
            Category:req.body.Category
        })

    try {
        const savedproduct = await newProduct.save()

        // add into category
        belongingCategory = await categoryDB.findOne({"Title":req.body.Category});
        belongingCategory.Products.push(savedproduct._id);
        await belongingCategory.save();


        // add into seller's products
        let belongingSeller = await sellerDB.findOne({"UserName":req.body.SellerID});
        belongingSeller.Products.push(savedproduct._id);
        await belongingSeller.save();

        // on success, send back 200
        res.status(200).json(savedproduct)
    }
    catch (err) {
        // on error, send back error
        res.status(400).json({ message: err.message })
    }
})

// PATCH with respect to :id and the given input
router.patch('/:id', getProductInstance, async (req, res) => {

    if (req.body.Title) {
        res.productInstance.Title = req.body.Title
    }
    else if (body.Price) {
        res.productInstance.Price = req.body.Price
    }
    else if (body.Description) {
        res.productInstance.Description = req.body.Description
    }

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
    try {
        await res.productInstance.remove()
        res.json({ message: 'Successfully deleted the product' })
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete the product' })
    }
})



// middleware that finds the product instance by :id from the database
async function getProductInstance(req, res, next) {
    let productInstance

    try {
        // find product by Username
        productInstance = await productDB.findOne({ "_id": req.params.id })
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