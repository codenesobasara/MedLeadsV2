const { DataTypes } = require('sequelize');
const sequelize = require("../mainConfig");

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  hostId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  eventType: {
    type: DataTypes.ENUM('expo', 'conference', 'workshop'),
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  venue: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  region: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  estimatedAttendees: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  attendeeGroups: {
     type: DataTypes.TEXT('long'),
    allowNull: true,
  },

  format: {
    type: DataTypes.ENUM('in-person', 'hybrid', 'virtual'),
    allowNull: false,
  },

  timezone: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'America/Toronto',
  },


}, {
  tableName: 'events',
  timestamps: true,
});

module.exports = Event;
