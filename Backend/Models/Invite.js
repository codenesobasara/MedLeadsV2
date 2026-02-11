
const { DataTypes } = require("sequelize");
const sequelize = require("../mainConfig"); 

const Invite = sequelize.define(
  "Invite",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

  
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

   
    tokenHash: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },

    
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    usedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },

);

module.exports = Invite;
