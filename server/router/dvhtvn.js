const dvhcvn = require("../dvhcvn.json");

const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send(dvhcvn);
});

module.exports = router;
