const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/database.sqlite'
});

const db = {}; // exported object

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Define models
db.Usage = sequelize.define('Usage', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  commandName: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['userId', 'commandName']
    }
  ]
});


module.exports = db;
