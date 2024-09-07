const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

userSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.password, 12, (error, hash) => {
        user.password = hash
        next()
    })
})

module.exports = mongoose.model('User', userSchema)

