const { Messages, Users } = require('../models/Users.js')



exports.getMessages = async (req, res) => {
    const user_link = req.params['link']

    try {
        const user = await Users.findAll({
            where: {
                user_link: user_link
            }
        })

        const msg = await user[0].getTarget()
        if (!msg[0]) return res.status(404).json({ msg: "Andab elum mendapatkan pesan" })
        res.status(200).json({ msg: 'Berhasil mendapatkan pesan', msg })
    } catch (err) {
        res.status(400).json({ msg: 'Gagal mendapatkan pesan' })
        console.error(err)
    }
}

exports.sendMessages = async (req, res) => {
    const { from, to, message } = req.body
    const user_link = req.params['link']

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

        await toUser[0].addTarget([newMsg])

        return res.status(200).json({ msg: 'berhasil mengirim pesan', newMsg, user_link, name, userId})
    } catch (err) {
        res.status(400).json({ msg: 'gagal mengirim pesan' })

        console.error(err)
    }
}