const Sequelize = require('sequelize')
// const db = new Sequelize('ngl_web', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql'
// })

const db = new Sequelize(`mysql://root:${process.env.MYSQL_PASSWORD}@containers-us-west-29.railway.app:6340/railway`)


module.exports = db