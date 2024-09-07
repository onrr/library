const express = require('express')
const router = express.Router()

const {getBooks, getBook, createBook, deleteBook, updateBook} = require('../controllers/libraryController')


// Get All
router.get('/', getBooks)

// Get a Single
router.get('/:id', getBook)

// Post a New
router.post('/', createBook)

// Delete
router.delete('/:id', deleteBook)

// Update
router.patch('/:id', updateBook)


module.exports = router