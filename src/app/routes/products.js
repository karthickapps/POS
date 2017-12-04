const express = require("express");

const productController = require("../controllers/products");

const router = express.Router();

router.get("/products", productController.getAllProducts);

router.get("/products/:id", productController.getProductById);

router.delete("/products/:id", productController.deleteProduct);

router.post("/product", productController.createProduct);

module.exports = router;
