const { DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Import kết nối cơ sở dữ liệu Sequelize của bạn

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  doctorID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  customerID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  slotID: {
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
  reason: {
    type: DataTypes.STRING(50000),
    allowNull: true,
  },
  amountValue: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'Appointments',
});

module.exports = Appointment;
