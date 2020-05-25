const models = require("../models");

// Get product list
function getProducts(req, res) {
  models.Products.findAll()
    .then((products) => {
      res.jsend.success(products);
    })
    .catch((err) => res.jsend.error(err));
}

function getAllUserProducts(req, res) {
  const query = {
    where: {
      username: req.params.id,
    },
  };
  models.Users.findOne({
    query,
    include: [{ model: models.Products, as: "products" }],
  })
    .then((userData) => userData.products)
    .then((userProducts) => res.jsend.success(userProducts))
    .catch((err) => res.jsend.error(err));
}

module.exports = { getProducts, getAllUserProducts };
