const express = require("express");
const router = express.Router();
const jsend = require("jsend");

const product = require("./products");
const user = require("./users");
const login = require("./login");

router.use(jsend.middleware);

router.get("/products", product.get);
router.get("/users/:id", user.getUser);
router.post("/login", login.userAuth);

module.exports = router;
