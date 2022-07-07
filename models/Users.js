const db = require('../config/Database.js')
const {DataTypes} = require('sequelize')
const Users = db.define('User', {
    username: {
        type: DataTypes.TEXT
    },
    password: {
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.STRING
    },
    user_link: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName : true
})

module.exports = Users