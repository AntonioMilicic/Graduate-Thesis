const Sequelize = require("sequelize");
const db = require("../config/database");

const Products = db.define("product", {
  owner: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.STRING,
  },
  image_sources: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
});

module.exports = Products;
