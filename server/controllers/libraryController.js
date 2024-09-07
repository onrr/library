const mongoose = require('mongoose')

const Library = require('../models/libaryModel')


// get all libary
const getBooks = async (req, res) => {
    const book = await Library.find({}).sort({createdAt: -1})
    res.status(200).json(book)
}

// get a single
const getBook = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such book'})
    }

    const book = await Library.findById(id)


    if (!book) return res.status(400).json({error: "No such book"})

    res.status(200).json(book)
} 

// create a new
const createBook = async (req, res) => {
    const {name, author, description, page} = req.body

    let emptyFields = []

    if (!name) emptyFields.push('name')
    if (!author) emptyFields.push('author')

    if (emptyFields.length > 0 ) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    try {
        const book = await Library.create({name, author, description, page})
        res.status(200).json(book)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete
const deleteBook = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such book'})
    }

    const book = await Library.findOneAndDelete({_id: id})


    if (!book) return res.status(400).json({error: "No such book"})

    res.status(200).json(book)
}

// update
const updateBook = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such book'})
    }

    const book = await Library.findOneAndUpdate({_id: id}, {
        ...req.body
    })


    if (!book) return res.status(400).json({error: "No such book"})

    res.status(200).json(book)
}


module.exports = {
    getBooks,
    getBook,
    createBook,
    deleteBook,
    updateBook
}