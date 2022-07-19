const express = require('express')
const port = 3001
const db = require('./config/Database.js')
const { Users, Messages } = require('./models/Users.js')
const Router = require('./routes/Router.js')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
dotenv.config()

app = express()

try {
    console.log('COBA GAN RAILWAY NIH ASU')
    const connect = db.authenticate()
    connect.then(() => {
        console.log('berhasil')
    })
    const sync = Users.sync()
    sync.then(() => {
        console.log('db created')
    })
    const msg = Messages.sync()
    msg.then(() => {
        console.log('db created')
    })
} catch (err) {
    console.log('COBA GAN RAILWAY NIH ASU')
    console.error(err)
}

app.use(cookieParser())
app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL || 'http://localhost:3000' }))
app.use(express.json())
app.use(Router)
app.use('/', (req, res) =>{
    res.json({msg: "API FOR MENFESSKUY WEBSITE"})
} )
app.listen(process.env.PORT || port, console.log(`Listening to port ${port}`))