const Sequelize = require('sequelize')
const db = new Sequelize('ngl_web', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = db