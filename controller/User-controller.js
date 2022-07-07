const Users = require('../models/Users.js')
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
    const { username, password, confirmationPass } = req.body

    if (password !== confirmationPass) {
        res.status(401).json({ msg: 'Password tidak sama!' })
    }

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)

    try {
        const user = await Users.create({
            username: username,
            password: hashPassword,
            user_link: '123'
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

        res.status(200).json({ msg: 'LOGIN!', user })
    } catch (err) {
        console.error(err)
    }
}

exports.Logout = async (req, res) => {
    try {
        const { username } = req.body

        const user = await Users.findAll({
            where: {
                username: username
            }
        })

        res.status(200).json({ msg: 'BERASHIL LOGOUT' })
    } catch (err) {
        console.error(err)
    }
}