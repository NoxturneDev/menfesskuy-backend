const jwt = require('jsonwebtoken')
const Users = require('../models/Users.js')

exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    console.log(authHeader)
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
        if (err) return res.sendStatus(403)
        req.username = decoded.username
        req.link = decoded.user_link
        next()
    })
}

exports.refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.sendStatus(401)

        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        })

        if (!user[0]) res.sendStatus(403)
        jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, (err) => {
            if (err) res.sendStatus(403)

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
    }
}