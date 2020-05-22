const express = require("express");
const router = express.Router();
const jsend = require("jsend");

const product = require("./products");
const user = require("./users");

router.use(jsend.middleware);

router.get("/products", product.get);
router.get("/users/:id", user.getUser);
router.post("/login", user.userAuth);
router.post("/createAccount", user.addUser);
router.post("/updateAccount", user.updateUser);

module.exports = router;
