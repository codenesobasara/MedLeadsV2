const { DataTypes } = require('sequelize');
const sequelize = require("../mainConfig");

const VendorQuestion = sequelize.define('VendorQuestion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  vendorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  questionText: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  type: {
    type: DataTypes.ENUM('TEXT', 'YES_NO', 'MULTI_CHOICE'),
    allowNull: false,
    defaultValue: 'TEXT',
  },

  isRequired: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, 
  },

  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },

  helpText: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = VendorQuestion;
