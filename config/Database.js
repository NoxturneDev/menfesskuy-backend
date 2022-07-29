const Sequelize = require('sequelize')
// const db = new Sequelize('ngl_web', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql'
// })

const db = new Sequelize(`mysql://root:${process.env.MYSQL_PASSWORD}@containers-us-west-87.railway.app:7783/railway`)


module.exports = db