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
      .then(() => res.jsend.success("success"))
      .catch((err) => res.jsend.error(err));
  }
}

async function updateProduct(req, res) {
  const id = req.params.id;
  const payload = req.body;
  const product = await models.Products.findByPk(id);
  if (product != null) {
    product.title = payload.title;
    product.price = payload.price;
    product.quantity = payload.quantity;
    product.description = payload.description;
    product.category = payload.category;
    product.imageSources = payload.imageSources;

    product.save();
    res.jsend.success("updated");
  } else res.jsend.error(product);

}

function deleteProduct(req, res) {
  const id = req.params.id;
  models.Products.findByPk(id)
    .then(data => { data.destroy() })
    .then(() => res.jsend.success("deleted"))
    .catch((err) => res.jsend.error(err));
}

module.exports = { getProducts, getAllUserProducts, createProduct, updateProduct, deleteProduct };
