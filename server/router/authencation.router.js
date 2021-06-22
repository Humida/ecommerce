const express = require("express");
const authencationController = require("../controller/authencation.controller");
const router = express.Router();

const authenticationController = require("../controller/authencation.controller");

router.post("/register", authenticationController.register);

router.post("/login", authencationController.login);

module.exports = router;
