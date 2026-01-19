const { DataTypes } = require('sequelize');
const sequelize = require("../mainConfig");

const Scan = sequelize.define('Scan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  attendeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
  vendorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  salesRepId: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },

  type: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "scan",
  },

  scannedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

});

module.exports = Scan;
