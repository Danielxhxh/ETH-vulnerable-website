var express = require("express");
const ProductsController = require("../controllers/ProductsController");

var router = express.Router();

router.get("/", ProductsController.productsList);
router.get("/:name", ProductsController.productDetail);

module.exports = router;
