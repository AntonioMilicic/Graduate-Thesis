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
};

models.Users.hasMany(models.Products, { as: "products" });
models.Products.belongsTo(models.Users, { as: "user" });

models.Sequelize = Sequelize;
models.sequelize = sequelize;

module.exports = models;
