const { DataTypes } = require('sequelize');
const sequelize = require("../mainConfig");


const SalesRepTerritory = sequelize.define('SalesRepTerritories', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  salesRepId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  level: {
    type: DataTypes.ENUM('PROVINCE', 'CITY', 'POSTAL'),
    allowNull: false,
  },

  country: {
    type: DataTypes.ENUM('CA', 'US'),
    allowNull: false,
  },

  provinceCode: {
    type: DataTypes.STRING(10), 
    allowNull: true,
  },

  cityName: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },

  cityPlaceId: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },

  postalCode: {
    type: DataTypes.STRING(12), 
    allowNull: true,
  },
});

module.exports = SalesRepTerritory;