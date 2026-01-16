// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require("../config/mainConfig");

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },

  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  companyName: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  contactPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  businessAddress: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  province: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  role: {
    type: DataTypes.ENUM('host', 'vendor', 'rep', 'admin'),
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM('ACTIVE', 'DISABLED'),
    allowNull: false,
    defaultValue: 'ACTIVE',
  },
});

module.exports = User;
