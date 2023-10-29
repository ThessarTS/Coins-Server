'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyCoin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MyCoin.init({
    UserId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    symbol: DataTypes.STRING,
    quantity: DataTypes.FLOAT,
    price: DataTypes.INTEGER,
    icon: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MyCoin',
  });
  return MyCoin;
};