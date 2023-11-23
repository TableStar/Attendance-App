'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attendances extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      attendances.belongsTo(models.employees)
    }
  }
  attendances.init({
    employeeId: DataTypes.INTEGER,
    clockIn: DataTypes.DATE,
    clockOut: DataTypes.DATE,
    location: DataTypes.STRING,
    salary: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'attendances',
  });
  return attendances;
};