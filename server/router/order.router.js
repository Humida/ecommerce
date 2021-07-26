const express = require("express");
const router = express.Router();

const orderController = require("../controller/order.controller");

router.post("/buy", orderController.buy);

module.exports = router;