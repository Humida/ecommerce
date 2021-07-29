const express = require("express");
const router = express.Router();
const {
    buyWithoutAccount,
    buyWithAccount,
} = require("../controller/order.controller");

const { protect } = require('../middleware/auth');

// @desc      order product with account
// @route     post /order/:id/
// @access    private
// router.post("/user/:id", buyWithAccount);
router.route('/:id').post(protect, buyWithAccount);

// @desc      order product without account
// @route     get /product/query/
// @access    public
router.post("/without-account", buyWithoutAccount);

module.exports = router;