"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserInfo.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  UserInfo.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      dob: DataTypes.DATE,
      address: DataTypes.STRING,
      kelurahan: DataTypes.STRING,
      kecamatan: DataTypes.STRING,
      province: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserInfo",
    }
  );
  return UserInfo;
};
