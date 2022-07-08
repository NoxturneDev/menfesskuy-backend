const express = require('express')
const port = 3001
const db = require('./config/Database.js')
const Users = require('./models/Users.js')
const Router = require('./routes/Router.js')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
dotenv.config()

app = express()

try {
    const connect = db.authenticate()
    connect.then(() => {
        console.log('berhasil')
    })
    const sync = Users.sync()
    sync.then(() => {
        console.log('db created')
    })
} catch (err) {
    console.error(err)
}

app.use(express.json())
app.use(cookieParser())
app.use(Router)
app.use('/', (req, res) => {
    res.json({ msg: "BERHASIL" })
})

app.listen(port, console.log(`Listening to port ${port}`))