const express = require("express");
const { register, login } = require('../controller/auth.controller');
const router = express.Router();

// @desc      register
// @route     post /auth/register
// @access    public

router.post("/register", register);

// @desc      login
// @route     post auth/login
// @access    public

router.post("/login", login);

module.exports = router;