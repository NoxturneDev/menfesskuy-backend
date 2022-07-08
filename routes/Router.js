const {getUsers, registerUser, Login, Logout} = require('../controller/User-controller.js')
const express = require('express')
const {verifyToken, refreshToken} = require('../middleware/VerifyToken.js')
const {getMessages, sendMessages } = require('../controller/Message-controller.js')
const router = express.Router()

router.get('/api/users', verifyToken, getUsers)
router.post('/api/users', registerUser)
router.post('/login', Login)
router.delete('/logout', Logout)
router.post('/api/token', refreshToken)

// MESSAGE API
router.get('/api/get/message', getMessages)
router.post('/api/send/message', sendMessages)

//GET SPECIFIC USER BY GIVEN LINK
router.post('/api/send/message/:link', sendMessages)
router.get('/api/get/message/:link', getMessages)




module.exports = router