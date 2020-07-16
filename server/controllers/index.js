const express = require("express");
const router = express.Router();
const jsend = require("jsend");

const product = require("./products");
const user = require("./users");
const order = require("./orders");

router.use(jsend.middleware);

router.get("/products", product.getProducts);
router.get("/products/user-products/:id", product.getAllUserProducts);
router.post("/products/user-product/create", product.createProduct);
router.put("/products/user-product/update/:id", product.updateProduct);
router.delete("/products/user-product/delete/:id", product.deleteProduct);
router.get("/users/user-by-product-Id/:id", user.getUserByProductId);
router.get("/users/:id", user.getUser);
router.post("/login", user.userAuth);
router.post("/create-account", user.addUser);
router.put("/update-account", user.updateUser);
router.post("/create-order", order.createOrder);
router.get("/user-orders/:id", order.getOrders);

module.exports = router;
