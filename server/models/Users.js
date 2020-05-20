const Sequelize = require("sequelize");
const db = require("../config/database");

const Users = db.define("user", {
  first_name: {
    type: Sequelize.STRING,
  },
  last_name: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  house_number: {
    type: Sequelize.STRING,
  },
  zip_code: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
});

const UsersNeededData = db.define("user", {
  first_name: {
    type: Sequelize.STRING,
  },
  last_name: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  house_number: {
    type: Sequelize.STRING,
  },
  zip_code: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
});

module.exports = { Users, UsersNeededData };
