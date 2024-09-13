const express = require('express')

const {createUser, loginUser, logOutUser} = require('../controllers/authController')

const router = express.Router()

// router.get('/', getUsers)
// router.get('/:id', getUser)
router.post('/signup', createUser)
router.post('/login', loginUser)
router.post('/logout', logOutUser)

module.exports = router

