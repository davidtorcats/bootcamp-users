const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "firstName",
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "lastName",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
    field: "email",
  },
});

module.exports = User;
