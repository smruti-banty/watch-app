const express = require('express');
const router = express.Router();
const productController = require("../controller/product.controller");

router.get("/product", productController.getAllProduct);
router.post("/product/cart", productController.addToCart);
router.get("/product/cart", productController.allCartList);
router.get("/product/cart/count", productController.totalCartProduct);
router.delete("/product/cart/:cartId", productController.deleteCart);
router.delete("/product/cart", productController.removeAllCart);
router.post("/product/cart/checkout", productController.checkout);

router.get((request, response) => { response.status(404).json({ "message": "Not exists" }) })

module.exports = router;