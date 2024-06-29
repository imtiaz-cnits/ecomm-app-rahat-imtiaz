const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.get("/CreateProduct", ProductController.CreateProduct);

module.exports = router;
