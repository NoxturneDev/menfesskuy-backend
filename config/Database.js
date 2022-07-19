const Sequelize = require('sequelize')
const db = new Sequelize('railway', 'root', "0thevizrOiBic7wi8XUe", {
    host: 'containers-us-west-29.railway.app',
    dialect: 'mysql'
})


module.exports = db