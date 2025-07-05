const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/database.sqlite'
});

const db = {}; // This will be the exported object

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Define your models
db.Usage = sequelize.define('Usage', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = db;
