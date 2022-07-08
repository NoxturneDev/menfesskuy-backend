const { Messages, Users } = require('../models/Users.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.getMessages = async (req, res) => {
    const user_link = req.params['link']


    try {
        const user = await Users.findAll({
            where: {
                user_link: user_link
            }
        })

        const msg = await user[0].getTarget()
        if (!msg[0]) return res.status(400).json({ msg: "tidak ada pesan" })
        res.status(200).json({ msg: 'berhasil dpt pesan', msg })
    } catch (err) {
        res.status(204).json({ msg: 'tidak ada pesan' })
        console.error(err)
    }
}

exports.sendMessages = async (req, res) => {
    const { from, to, message } = req.body
    const user_link = req.params['link']

    console.log(user_link)
    try {
        const toUser = await Users.findAll({
            where: {
                user_link: user_link
            }
        })

        const name = toUser[0].username
        const userId = toUser[0].id
        const newMsg = await Messages.create({
            from: from,
            to_user: to,
            message: message
        })

        const addMsg = await toUser[0].addTarget([newMsg])

        return res.status(200).json({ msg: 'berhasil mengirim pesan', newMsg, user_link, name, userId})
    } catch (err) {
        res.status(400).json({ msg: 'gagal mengirim pesan' })

        console.error(err)
    }
}