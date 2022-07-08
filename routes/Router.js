const {getUsers, registerUser, Login, Logout} = require('../controller/User-controller.js')
const express = require('express')
const {verifyToken, refreshToken} = require('../middleware/VerifyToken.js')
const router = express.Router()

router.get('/users', verifyToken, getUsers)
router.post('/users', registerUser)
router.post('/login', Login)
router.delete('/logout', Logout)
router.post('/token', refreshToken)
module.exports = router