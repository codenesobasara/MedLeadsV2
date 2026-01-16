const { DataTypes } = require('sequelize');
const sequelize = require("../config/mainConfig");

const Attendee = sequelize.define('Attendee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  npi: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true, 
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  specialty: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: { isEmail: true },
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  physician: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  checkedIn: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

});

module.exports = Attendee;
