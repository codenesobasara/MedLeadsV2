const { DataTypes } = require('sequelize');
const sequelize = require("../mainConfig");

const VendorProfile = sequelize.define('Vendor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  userId:{
    type:DataTypes.INTEGER,
    allowNull: false
  },

  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  contactName: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  contactEmail: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: { isEmail: true },
  },

  contactPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  boothNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },


});

module.exports = VendorProfile;
