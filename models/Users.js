const db = require('../config/Database.js')
const { DataTypes } = require('sequelize')
// const { Messages } = require('./Message.js')
const Users = db.define('User', {
    username: {
        type: DataTypes.TEXT,
        allowNull : false
    },
    password: {
        type: DataTypes.STRING,
        allowNull : false
    },
    refresh_token: {
        type: DataTypes.STRING
    },
    user_link: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true
})

// const db = require('../config/Database.js')
// const { DataTypes } = require('sequelize')
// const { Users } = require('./Users.js')
const Messages = db.define('Msg', {
    from: {
        type: DataTypes.STRING
    },
    to_user: {
        type: DataTypes.STRING
    },
    message: {
        type: DataTypes.TEXT,
        allowNull : false
    }
}, {
    freezeTableName: true
})

Users.hasMany(Messages, {as: 'target'})
Messages.belongsTo(Users)

module.exports = {Messages, Users}
