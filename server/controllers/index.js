const express = require("express");
const router = express.Router();
const jsend = require("jsend");

const product = require("./products");
const user = require("./users");

router.use(jsend.middleware);

router.get("/products", product.getProducts);
router.get("/users/:id", user.getUser);
router.get("/products/user-products/:id", product.getAllUserProducts);
router.post("/products/user-product/create", product.createProduct);
router.post("/products/user-product/update/:id", product.updateProduct);
router.delete("/products/user-product/delete/:id", product.deleteProduct);
router.post("/login", user.userAuth);
router.post("/createAccount", user.addUser);
router.post("/updateAccount", user.updateUser);

module.exports = router;
