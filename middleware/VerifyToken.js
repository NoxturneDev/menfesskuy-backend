const jwt = require('jsonwebtoken')
const { Users } = require('../models/Users.js')

exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const user_link = req.params['link']

    if (token == null) return res.status(401).json({ msg: "gagal dapet token" })
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
        if (err) return res.sendStatus(403)
        req.username = decoded.username
        req.link = decoded.user_link
        if (user_link) {
            if (req.link !== user_link) return res.sendStatus(403)
        }
        next()
    })
}

exports.tokenRefresh = async (req, res) => {
    try {
        const token = req.cookies.refreshToken
        console.log(token)
        if (!token) return res.status(401).json({ msg: "gagal dapet token" })

        const user = await Users.findAll({
            where: {
                refresh_token: token
            }
        })

        if (!user[0]) return res.sendStatus(403)
        jwt.verify(token, process.env.SECRET_REFRESH_TOKEN, (err) => {
            if (err) return res.sendStatus(403)

            const userId = user[0].id
            const username = user[0].username
            const user_link = user[0].user_link
            const accessToken = jwt.sign({ userId, username, user_link }, process.env.SECRET_ACCESS_TOKEN, {
                expiresIn: '15s'
            })

            res.json({ accessToken })
        })
    } catch (err) {
        console.error(err)
        return res.sendStatus(400)
    }
}