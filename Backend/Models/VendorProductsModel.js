const { DataTypes } = require('sequelize');
const sequelize = require("../mainConfig");

const VendorProduct = sequelize.define('VendorProduct', {
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

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  sku: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  isFdaApproved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  fdaApprovalNumber: {
    type: DataTypes.STRING,
    allowNull: true,  // only filled if isFdaApproved = true
  },

  fdaClass: {
    type: DataTypes.STRING,
    allowNull: true,  // e.g. "Class I / II / III"
  },
});

module.exports = VendorProduct;
