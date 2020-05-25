const models = require("../models");

// Get product list
function getProducts(req, res) {
  models.Products.findAll()
    .then((products) => {
      res.jsend.success(products);
    })
    .catch((err) => res.jsend.error(err));
}

module.exports = { getProducts };
