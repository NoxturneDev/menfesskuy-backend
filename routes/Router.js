const { getUsers, registerUser, Login, Logout } = require('../controller/User-controller.js')
const express = require('express')
const { verifyToken, tokenRefresh } = require('../middleware/VerifyToken.js')
const { getMessages, sendMessages } = require('../controller/Message-controller.js')
const router = express.Router()

router.get('/api/users', verifyToken, getUsers)
router.post('/api/users', registerUser)
router.post('/login', Login)
router.delete('/logout', Logout)
router.get('/api/token', tokenRefresh)

//GET SPECIFIC USER BY GIVEN LINK
router.post('/api/send/message/:link', sendMessages)
router.get('/api/get/message/:link', verifyToken, getMessages)
// router.get('/api/get/link', verifyToken, generateLink) DEPRECATED






module.exports = router