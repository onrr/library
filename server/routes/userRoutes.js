const express = require('express')

const {createUser, loginUser, getUsers, getUser} = require('../controllers/authController')

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/signup', createUser)
router.post('/login', loginUser)

module.exports = router

