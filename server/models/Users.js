const Sequelize = require("sequelize");
const db = require("../config/database");

const Users = db.define("user", {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
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
  houseNumber: {
    type: Sequelize.STRING,
  },
  zipCode: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
});

// User has many products
Users.associate = (models) => {
  Users.hasMany(models.Products);
};

module.exports = Users;
