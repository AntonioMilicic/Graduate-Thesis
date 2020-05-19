const Sequelize = require("sequelize");
const db = require("../config/database");

const LoginData = db.define("users", {
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = LoginData;
