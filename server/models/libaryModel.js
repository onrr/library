const mongoose = require('mongoose')

const Schema = mongoose.Schema


const libarySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    page: {
        type: Number,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Book', libarySchema)

