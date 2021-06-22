require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
// connect mongoDB
const db = require("../server/config/db");
db.connect();

// require router
const authencationRouter = require("../server/router/authencation.router");
const productRouter = require("../server/router/product.router");

// middleware
app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  })
);

// router
app.use("/authencation", authencationRouter);
app.use("/product", productRouter);

const PORT = 4000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`app is listen on ${PORT}`);
});
