const { DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Import kết nối cơ sở dữ liệu Sequelize của bạn

const ProfileSymptom = sequelize.define('ProfileSymptom', {
  idsymptom: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  TreatmentProfileID: {
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
}, {
  tableName: 'Profile_Symptoms',
});

module.exports = ProfileSymptom;
