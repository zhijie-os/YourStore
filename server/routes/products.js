const express = require('express')
const router = express.Router()
const productDB = require('../models/products')
const categoryDB = require('../models/categories')
const sellerDB = require('../models/sellers')


router.get('/', async (req, res) => {

    try {
        const searchKey = req.query.searchKey;
        const category = req.query.category;

        let allProducts;
        if (category) {
            allProducts = await categoryDB.findOne({ "Title": category });
            allProducts = allProducts.Products;

            allProducts = await Promise.all(allProducts.map(async (productID) => {
                const product = await productDB.findOne({ "_id": productID });
                return product;
            }));

            console.log(allProducts);
        }
        else {
            // no specified category
            allProducts = await productDB.find();
        }

        if (searchKey) {
            allProducts = allProducts.filter((product) => {
                return (product.Title == searchKey || product.SearchKeys.includes(searchKey));
            })
        }

        allProducts = allProducts.filter((product) => {
            return product.Inventory > 0;
        })


        allProducts = allProducts.filter((product) => {
            return product.Owned != false;
        })

        console.log(allProducts);
        res.json(allProducts)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }

})


// GET a user with respect to :id
router.get('/:id', getProductInstance, (req, res) => {
    res.send(res.productInstance)
})

// create a product with respect to the JSON input
router.post('/', async (req, res) => {

    // parse the JSON
    const newProduct = new productDB(
        {
            SellerID: req.body.SellerID,
            Title: req.body.Title,
            Price: req.body.Price,
            Inventory: req.body.Inventory,
            Description: req.body.Description,
            SearchKeys: req.body.SearchKeys,
            Category: req.body.Category,
            Owned: true,
        })

    try {
        const savedproduct = await newProduct.save()

        // add into category
        belongingCategory = await categoryDB.findOne({ "Title": req.body.Category });
        belongingCategory.Products.push(savedproduct._id);
        await belongingCategory.save();


        // add into seller's products
        let belongingSeller = await sellerDB.findOne({ "UserName": req.body.SellerID });
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
    if (req.body.Price) {
        res.productInstance.Price = req.body.Price
    }
    if (req.body.Description) {
        res.productInstance.Description = req.body.Description
    }
    if (req.body.Category) {
        res.productInstance.Category = req.body.Category
    }
    if (req.body.SearchKeys) {
        res.productInstance.SearchKeys = req.body.SearchKeys
    }
    if (req.body.Inventory) {
        res.productInstance.Inventory = req.body.Inventory
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
        if (res.productInstance.Owned) {
            const sellerInstance = await sellerDB.findOne({ "UserName": res.productInstance.SellerID });

            let index = sellerInstance.Products.indexOf(res.productInstance._id);
            if (index > -1) {
                sellerInstance.Products.splice(index, 1); // 2nd parameter means remove one item only
            }

            await sellerInstance.save();

            res.productInstance.Owned = false;
            await res.productInstance.save();

            let categoryInstance = await categoryDB.findOne({ "Title": res.productInstance.Category })
            index = categoryInstance.Products.indexOf(res.productInstance._id);
            if (index > -1) {
                categoryInstance.Products.splice(index, 1); // 2nd parameter means remove one item only
            }
            await categoryInstance.save();


            res.json({ message: 'Successfully deleted the product...' })

        }
        else {
            res.status(500).json({ message: 'Product is already deleted...' })
        }

    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete the product...' })
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