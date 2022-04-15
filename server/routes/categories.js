require('dotenv').config();


const express = require('express')
const router = express.Router()
const categoryDB = require('../models/categories')


const jwt = require("jsonwebtoken");

router.get('/', authenticateToken, async (req, res) => {
    try {
        // all category is a list
        const allCategories = await categoryDB.find()
        res.status(200).json(allCategories)
    }
    catch (err) {

        res.status(500).json({ message: err.message })

    }

})

// GET a category with respect to :id
router.get('/:id', authenticateToken, getCategoryInstance, (req, res) => {
    res.send(res.categoryInstance)
})

// POST a category with respect to the JSON input
router.post('/', authenticateToken,async (req, res) => {

    if (req.user.UserType != "admin") {
        res.status(403).json({ message: "Permission required..." });
        return;
    }

    // parse the JSON
    const newCategory = new categoryDB(
        {
            Title: req.body.Title,
            ProductsID: []
        })

    try {
        const savedCategory = await newCategory.save()
        // on success, send back 201
        res.status(200).json(savedCategory)
    }
    catch (err) {
        // on error, send back error
        res.status(400).json({ message: err.message })
    }
})



// DELETE a category with respect to :id
router.delete('/:id',authenticateToken, getCategoryInstance, async (req, res) => {
    if (req.user.UserType != "admin") {
        res.status(403).json({ message: "Permission required..." });
        return;
    }
    
    
    // try to remove
    try {
        await res.categoryInstance.remove()
        res.json({ message: 'Successfully deleted the category' })
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete the category' })
    }
})


// middleware that finds the category instance by :id from the database
async function getCategoryInstance(req, res, next) {
    let categoryInstance

    try {
        // find category by Title
        categoryInstance = await categoryDB.findOne({ "Title": req.params.id })
        // if category not exist, then send error status
        if (categoryInstance == null) {
            return res.status(404).json({ message: 'Cannot find category' })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.categoryInstance = categoryInstance
    next()
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }


    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}


module.exports = router