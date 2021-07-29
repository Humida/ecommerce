const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/auth');

const {
    createProduct,
    updateProduct,
    queryProducts,
    deleteProduct,
    getProduct
} = require('../controller/product.controller');

// @desc      query product
// @route     get /product/query/
// @access    public
router.route('/query').get(queryProducts);

// @desc      get product
// @route     get /product/:id
// @access    public
router.route('/:id').get(getProduct);

// @desc      update product
// @route     put /product/update/:id
// @access    private admin
router.route('/update/:id').put(updateProduct);

// @desc      delete product
// @route     detete /product/detete/:id
// @access    private admin
router.route('/delete/:id').post(deleteProduct);

// @desc      add product
// @route     post /product/add/
// @access    prive admin
router.route('/add').post(createProduct);


module.exports = router;