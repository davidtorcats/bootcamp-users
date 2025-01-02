const sequelize = require("../config/db.config");
const User = require("./user.model");
const Bootcamp = require("./bootcamp.model");

User.belongsToMany(Bootcamp, { through: "UserBootcamp" });
Bootcamp.belongsToMany(User, { through: "UserBootcamp" });

module.exports = {
  sequelize,
  User,
  Bootcamp,
};
