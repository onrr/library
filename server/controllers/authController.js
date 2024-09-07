const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const User = require('../models/userModel')

const createUser = async (req, res) => {
    const { name, email, password } = req.body

    let emptyFields = []

    if (!name) emptyFields.push('name')
    if (!email) emptyFields.push('email')
    if (!password) emptyFields.push('password')

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
        const control = await User.findOne({ email })
        if (!control) {
            const user = await User.create({ name, email, password })

            res.status(201).json({
                status: 'success',
                user,
            })
        }

        else {
            res.status(404).json({ exist: 'This email has already exist' })
        }



    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error,
        })

    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    let emptyFields = []

    if (!email) emptyFields.push('email')
    if (!password) emptyFields.push('password')

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {

        await User.findOne({ email }).then(
            (user) => {
                if (user) {
                    bcrypt.compare(password, user.password, async (err, match) => {
                        if (match) {
                            res.status(200).json({
                                status: "success",
                            })
                        }
                        else {
                            res.status(404).json({ notMatch: 'Your password is incorrect' })
                        }
                    })
                }
                else {
                    res.status(404).json({ notMatch: 'Such an email does not exist' })
                }

            }
        )

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error,
        })

    }
}

const getUsers = async (req, res) => {
    const user = await User.find({}).sort({ createdAt: -1 })
    res.status(200).json(user)
}

const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such user' })
    }

    const user = await User.findById(id)


    if (!user) return res.status(400).json({ error: "No such user" })

    res.status(200).json(user)
}


module.exports = { createUser, loginUser, getUsers, getUser }