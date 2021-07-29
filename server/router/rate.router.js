const express = require('express');

const router = express.Router();

const { getRatings, getSingleRating, addRating } = require('../controller/rate.controller');

const { protect } = require('../middleware/auth');


router.route('/product/:id/rate').get(getRatings);

router.route('/product/:id/add-rate').post(protect, addRating);

module.exports = router;