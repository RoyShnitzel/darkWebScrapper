"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Alert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Data, {
        foreignKey: "dataId",
      });
    }
  }
  Alert.init(
    {
      dataId: DataTypes.NUMBER,
      keyWord: DataTypes.STRING,
      match: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Alert",
      tableName: "alerts",
      underscored: true,
    }
  );
  return Alert;
};
