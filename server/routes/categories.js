const express = require('express')
const router = express.Router()
const categoryDB = require('../models/categories')


router.get('/', async (req, res) => {
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
router.get('/:id', getCategoryInstance, (req, res) => {
    res.send(res.categoryInstance)
})

// POST a category with respect to the JSON input
router.post('/', async (req, res) => {

    // parse the JSON
    const newCategory = new categoryDB(
        {
            Title: req.body.Title,
            ProductsID:[]
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


// PATCH with respect to :id and the given input
router.patch('/:id', getCategoryInstance, async (req, res) => {

    if (req.body.Title) {
        res.categoryInstance.Title = req.body.Title
    }

    // try to save back
    try {
        const updatedcategory = await res.categoryInstance.save()
        // successed
        res.status(200).json(updatedcategory)
    }
    catch (err) {
        // error on our side
        res.status(500).json({ message: 'Failed to update the password' })
    }

})

// DELETE a user with respect to :id
router.delete('/:id', getCategoryInstance, async (req, res) => {
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

module.exports = router