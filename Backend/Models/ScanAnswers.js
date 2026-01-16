const { DataTypes } = require('sequelize');
const sequelize = require("../config/mainConfig");

const ScanAnswer = sequelize.define('ScanAnswer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  scanId: {
    type: DataTypes.INTEGER,
    allowNull: false,   
  },

  vendorQuestionId: {
    type: DataTypes.INTEGER,
    allowNull: false,  
  },

  answerText: {
    type: DataTypes.TEXT,
    allowNull: true,    
  },
});

module.exports = ScanAnswer;
