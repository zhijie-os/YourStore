const express = require('express')
const router = express.Router()
const productDB = require('../models/products')
const categoryDB = require('../models/categories')
const orderDB = require('../models/orders')
const { route } = require('./products')


router.get('/products', async (req, res) => {

    try {
        let allProducts = await productDB.find(); 
        allProducts = allProducts.filter((product)=>{
            return product.Owned;
        });
        res.json(allProducts)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// create new category
router.post("/createCategory", async (req,res)=>{
    if(!req.body.Title)
    {
        res.status(500).json({ message: "Title is required for creating category." });
        return;
    }
    
    try{
        console.log("here")
        let cateInstance = await categoryDB.findOne({"Title":req.body.Title});

        console.log(cateInstance)
        if(cateInstance)
        {
            res.status(500).json({ message: "Category " + req.body.Title + " already exists." });
            return;
        }

        const newCategory = new categoryDB(
            {               // parse JSON
                Title: req.body.Title
            })
    
        await newCategory.save();
        
        res.json({message:"New category " + req.body.Title + " is created."})

    }catch(err)
    {
        res.status(500).json({ message: err.message });
    }
})


// get customer's orders by UserName
router.get("/orders",async (req, res) => {
    try {
        
        let actualOrders;

        actualOrders = await orderDB.find();

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
                "Order":order,
                "Product":product,
                "Status":status
            }
        }));


        res.json({ Orders: orderInfo });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});






module.exports = router