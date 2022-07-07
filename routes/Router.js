const {getUsers, registerUser, Login, Logout} = require('../controller/User-controller.js')
const express = require('express')
const router = express.Router()

router.get('/users', getUsers)
router.post('/users', registerUser)
router.post('/login', Login)
router.delete('/logout', Logout)
module.exports = router