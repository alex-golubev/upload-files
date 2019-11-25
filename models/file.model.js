const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

// noinspection JSUnresolvedFunction
const file = sequelize.define('files', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  file: {
    type: 'VARBINARY(MAX)',
    allowNull: false
  }
})

module.exports = file
