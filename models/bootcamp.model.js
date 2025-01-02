const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Bootcamp = sequelize.define("Bootcamp", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cue: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 5,
      max: 10,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Bootcamp;
