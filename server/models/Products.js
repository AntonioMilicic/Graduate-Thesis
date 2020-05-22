const Sequelize = require("sequelize");
const db = require("../config/database");

const Products = db.define("product", {
  userId: {
    type: Sequelize.INTEGER,
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
//Product has one owner
Products.associate = function(models) {
  Products.belongsTo(models.Users);
};

module.exports = Products;
