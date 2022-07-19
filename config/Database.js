const Sequelize = require('sequelize')
// const db = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
//     host: 'containers-us-west-29.railway.app',
//     dialect: 'mysql'
// })

const db = new Sequelize(`mysql://root:${process.env.MYSQL_PASSWORD}@containers-us-west-29.railway.app:6340/railway`)


module.exports = db