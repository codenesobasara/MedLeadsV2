const { DataTypes } = require('sequelize');
const sequelize = require("../mainConfig");


const SalesRepsProfile = sequelize.define(
  'SalesReps',
  {
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

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isEmail: true },
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = SalesRepsProfile;

