const Products = require("../models/Products");

// Get product list
function get(req, res) {
  Products.findAll()
    .then((products) => {
      res.jsend.success(products);
    })
    .catch((err) => res.jsend.error(err));
}

module.exports = { get };
