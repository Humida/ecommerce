require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const path = require("path");

// static folder
app.use(express.static(path.join(__dirname, "/public")));

// connect mongoDB
const db = require("../server/config/db");
db.connect();

// require router
const authenticationRouter = require("../server/router/authentication.router");
const productRouter = require("../server/router/product.router");
const locationRouter = require("../server/router/dvhtvn");
const orderRouter = require("../server/router/order.router");

// middleware
app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.raw());

app.use(cors());

// router
app.use("/authentication", authenticationRouter);
app.use("/product", productRouter);
app.use("/location", locationRouter);
app.use("/order", orderRouter);

const PORT = 4000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`app is listen on ${PORT}`);
});
