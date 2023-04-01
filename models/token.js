'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  token.init({
    token: DataTypes.STRING,
    user_id: DataTypes.STRING,
    type: DataTypes.STRING,
    expire_at: DataTypes.DATE,
    black_listed: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'token',
  });
  return token;
};