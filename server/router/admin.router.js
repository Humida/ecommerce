const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller");
const upload = require("../middleware/multer");

router.post("/add", upload.any(), productController.createProduct);

module.exports = router;
