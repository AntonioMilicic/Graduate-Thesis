const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const models = {
  Users: sequelize.import("./User.js"),
  Products: sequelize.import("./Product.js"),
  Orders: sequelize.import("./Order.js"),
  Cards: sequelize.import("./Card.js"),
  Buyers: sequelize.import("./Buyer.js")
};

models.Users.hasMany(models.Products, { as: "products" });
models.Users.hasMany(models.Orders, { as: "orders" });
models.Products.belongsTo(models.Users, { as: "user" });
models.Cards.hasMany(models.Orders, { as: "orders" });
models.Buyers.hasMany(models.Orders, { as: "orders" });
models.Orders.belongsTo(models.Users, { as: "user" });
models.Orders.belongsTo(models.Cards, { as: "card" });
models.Orders.belongsTo(models.Buyers, { as: "buyer" });

models.Sequelize = Sequelize;
models.sequelize = sequelize;

module.exports = models;
