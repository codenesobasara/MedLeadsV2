const { DataTypes } = require('sequelize');
const sequelize = require("../mainConfig");

const ScanProduct = sequelize.define('ScanProduct', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  scanId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

}, {
  indexes: [
    {
      unique: true,
      fields: ['scanId', 'productId'],
    },
  ],
});

module.exports = ScanProduct;