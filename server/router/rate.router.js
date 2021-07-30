const express = require('express');

const router = express.Router();

const {
    getRatings,
    getSingleRating,
    addRating,
    updateRating,
    deleteRating
} = require('../controller/rate.controller');

const { protect } = require('../middleware/auth');

// @desc      get all rate by product
// @route     get api/product/:id/rate
// @access    public
router.route('/product/:id/rate').get(getRatings);

// @desc      add a rate for product
// @route     post api/product/:id/add-rate
// @access    private
router.route('/product/:id/add-rate').post(protect, addRating);

// @desc      update a rate for product
// @route     post api/rate/:id/update
// @access    private
router.route('/rate/:id/update').patch(protect, updateRating);


// @desc      delete a rate for product
// @route     delete api/product/:id/delete
// @access    private
router.route('/rate/:id/delete').delete(protect, deleteRating);

module.exports = router;