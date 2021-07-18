const express = require("express");
const authenticationController = require("../controller/authentication.controller");
const router = express.Router();

router.post("/register", authenticationController.register);

router.post("/login", authenticationController.login);

module.exports = router;