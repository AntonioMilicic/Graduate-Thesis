const models = require("../models");

// Get product list
function getProducts(req, res) {
  models.Products.findAll()
    .then((products) => {
      res.jsend.success(products);
    })
    .catch((err) => res.jsend.error(err));
}

async function getAllUserProducts(req, res) {
  const id = req.params.id;
  models.Users.findByPk(id, { include: "products" })
    .then((data) => data.products)
    .then((userProducts) => res.jsend.success(userProducts))
    .catch((err) => res.jsend.error(err));
}

async function createProduct(req, res) {
  const query = {
    where: {
      username: req.body.username,
    },
  };
  const user = await models.Users.findOne(query);
  if (user != null) {
    delete req.body.username;
    const data = req.body;
    data.userId = user.id;

    const payload = { ...data };
    models.Products.create(payload)
      .then((data) => res.jsend.success("success"))
      .catch((err) => res.jsend.error(err));
  }
}

module.exports = { getProducts, getAllUserProducts, createProduct };
