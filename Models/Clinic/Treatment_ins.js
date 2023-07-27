const { DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Import kết nối cơ sở dữ liệu Sequelize của bạn

const TreatmentIn = sequelize.define('TreatmentIn', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  doctorID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  idTreatmentProfile: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  process: {
    type: DataTypes.STRING(2000),
    allowNull: true,
  },
  result: {
    type: DataTypes.STRING(2000),
    allowNull: true,
  },
  note: {
    type: DataTypes.STRING(2000),
    allowNull: true,
  },
}, {
  tableName: 'treatment_Ins',
});

module.exports = TreatmentIn;
