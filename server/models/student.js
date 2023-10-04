'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init({
    userid: DataTypes.INTEGER,
    batchid: DataTypes.INTEGER,
    name: DataTypes.STRING,
    school: DataTypes.STRING,
    standard: DataTypes.STRING,
    fee: DataTypes.INTEGER,
    admission_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};