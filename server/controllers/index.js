const express = require("express");
const router = express.Router();
const jsend = require("jsend");
const multer = require('multer');

const product = require("./products");
const user = require("./users");
const order = require("./orders");

router.use(jsend.middleware);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/src/assets/images/uploads/users");
  },
  filename: function (req, file, cb) {
    const setNameDate = new Date().toISOString().replace(/:/g, "-");
    cb(null, setNameDate + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/products", product.getProducts);
router.get("/products/user-products/:id", product.getAllUserProducts);
router.post("/products/user-product/create", product.createProduct);
router.put("/products/user-product/update/:id", product.updateProduct);
router.delete("/products/user-product/delete/:id", product.deleteProduct);
router.get("/users/user-by-product-Id/:id", user.getUserByProductId);
router.get("/users/:id", user.getUser);
router.post("/login", user.userAuth);
router.post("/create-account", upload.single("userImage"), user.addUser);
router.put("/update-account", upload.single("userImage"), user.updateUser);
router.post("/create-order", order.createOrder);
router.get("/user-orders/:id", order.getOrders);

module.exports = router;
