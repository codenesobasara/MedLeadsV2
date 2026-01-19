// models/HostProfile.js
const { DataTypes } = require('sequelize');
const sequelize = require("../mainConfig");

const HostProfile = sequelize.define('HostProfile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,  
  },

  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  contactName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  contactEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  contactPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = HostProfile;
