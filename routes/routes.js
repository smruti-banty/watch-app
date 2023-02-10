const express = require('express');
const router = express.Router();

const jwtHelper = require("../config/jwtHelper")
const productController = require("../controller/product.controller");
const userController = require("../controller/user.controller");

router.post("/user/signup", userController.signup);
router.post("/user/login", userController.login);
router.get("/user/logout", jwtHelper.verify, userController.logout);
router.post("/user/email", userController.checkEmail);
router.post("/user/forgot", userController.forgotPassword);

router.get("/product", productController.getAllProduct);
router.post("/product/cart", jwtHelper.verify, productController.addToCart);
router.get("/product/cart", jwtHelper.verify, productController.allCartList);
router.get("/product/cart/count", jwtHelper.verify, productController.totalCartProduct);
router.delete("/product/cart/:cartId", jwtHelper.verify, productController.deleteCart);
router.delete("/product/cart", jwtHelper.verify, productController.removeAllCart);
router.post("/product/cart/checkout", jwtHelper.verify, productController.checkout);
router.post("/product/rating", jwtHelper.verify, productController.addRating);
router.get("/product/rating/:productId/:category", productController.retriveRating);

router.get((request, response) => { response.status(404).json({ "message": "Not exists" }) })

module.exports = router;