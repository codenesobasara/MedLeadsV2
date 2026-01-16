const { DataTypes } = require('sequelize');
const sequelize = require("../config/mainConfig");

const VendorEvent = sequelize.define('VendorEvent', {
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

  status: {
    type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'),
    allowNull: false,
    defaultValue: 'PENDING',
  },

  boothNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  indexes: [
    { unique: true, fields: ['vendorId', 'eventId'] }
  ],
});

module.exports = VendorEvent;
