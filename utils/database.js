const Sequelize = require('sequelize')
const db = require('../config/db')

const sequelize = new Sequelize(db.name, db.user, db.password, {
  host: db.host,
  port: db.port,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      useUTC: false,
      dateFirst: 1
    }
  }
})

module.exports = sequelize
