const Sequelize = require("sequelize");
const db = require("../config/database");

const LoginData = db.define("loginData", {
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = LoginData;
