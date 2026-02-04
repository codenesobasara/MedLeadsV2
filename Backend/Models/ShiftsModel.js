const { DataTypes } = require('sequelize');
const sequelize = require("../mainConfig");

const SalesRepShifts = sequelize.define(
  'SalesRepShifts',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    salesRepId: {
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

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    endTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = SalesRepShifts;
