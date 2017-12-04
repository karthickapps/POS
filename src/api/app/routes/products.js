const passport = require("passport");
const express = require("express");
const router = express.Router();

const passportConf = require("../passport");
const productController = require("../controllers/products");

router.get("/products", productController.getAllProducts);

router.get("/products/:id", productController.getProductById);

router.delete("/products/:id", productController.deleteProduct);

router.post("/product", productController.createProduct);

module.exports = router;
