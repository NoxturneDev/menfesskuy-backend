const { Users } = require('../models/Users.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



exports.getUsers = async (req, res) => {
    try {
        const user = await Users.findAll()
        if (!user[0]) res.status(404).json({ msg: 'User not found' })
        res.status(200).json({ msg: 'Mantap', user })
    } catch (err) {

        console.error(err)
    }
}

exports.registerUser = async (req, res) => {
    const { username, password, confirmationPass, userLink } = req.body

    if (password !== confirmationPass) {
        res.status(401).json({ msg: 'Password tidak sama!' })
    }

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)

    try {
        const user = await Users.create({
            username: username,
            password: hashPassword,
            user_link: userLink
        })
        res.status(200).json({ msg: 'Mantap', user })
    } catch (err) {
        console.error(err)
    }
}

exports.Login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await Users.findAll({
            where: {
                username: username
            }
        })
        if (!user[0]) res.status(404).json({ msg: 'user tidak ada' })

        const match = await bcrypt.compare(password, user[0].password)
        if (!match) res.status(403).json({ msg: "Password salah cok!" })

        const userId = user[0].id
        const userName = user[0].username
        console.log(userId, userName)
        const accessToken = jwt.sign({ userId, userName }, process.env.SECRET_ACCESS_TOKEN, {
            expiresIn: '15s'
        })
        const refreshToken = jwt.sign({ userId, userName }, process.env.SECRET_REFRESH_TOKEN, {
            expiresIn: '1d'
        })

        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        }
        )

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,

        })
        res.json({ accessToken })
    } catch (err) {
        console.error(err)
    }
}

exports.Logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) return res.sendStatus(204)

        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        })

        if (!user[0]) return res.sendStatus(204)
        const userId = user[0].id

        await Users.update({ refresh_token: null }, {
            where: {
                id: userId
            }
        })

        res.clearCookie('refreshToken')
        res.status(200).json({ msg: 'BERASHIL LOGOUT' })
    } catch (err) {
        console.error(err)
    }
}