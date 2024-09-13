const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ notMatch: 'Such an email does not exist' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ notMatch: 'Your password is incorrect' });
        }

        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });

        res.cookie('token', token, {
            secure: true,
            httpOnly: true,
            sameSite: 'Strict',
        })

        res.cookie('email', email, {
            httpOnly: false,
            secure: true,
            sameSite: 'Strict',
        })
        // res.json({ token, email });
        res.json({ message: 'Login Successful' });

    } catch (error) {
        console.error(error);
        res.json({ notMatch: 'Internal server error' });
    }
}

const logOutUser = async (req, res) => {
    res.clearCookie('token')

    res.clearCookie('email')

    res.json({ message: 'Logout Successful' });
}

// const getUsers = async (req, res) => {
//     const user = await User.find({}).sort({ createdAt: -1 })
//     res.status(200).json(user)
// }

// const getUser = async (req, res) => {
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ error: 'No such user' })
//     }

//     const user = await User.findById(id)


//     if (!user) return res.status(400).json({ error: "No such user" })

//     res.status(200).json(user)
// }


module.exports = { createUser, loginUser, logOutUser }