require("dotenv").config();
const morgan = require('morgan');
const cors = require("cors");
const express = require("express");
const app = express();
const main = require('./controller/mail.controller');

// const bcrypt = require("bcrypt");
const path = require("path");
const errorHandle = require('./middleware/errorHandle');

// static folder
app.use(express.static(path.join(__dirname, "/public")));

// connect mongoDB
const db = require("../server/config/db");
db.connect();

// require router
const authRouter = require("../server/router/auth.router");
const productRouter = require("../server/router/product.router");
const locationRouter = require("../server/router/dvhtvn");
const orderRouter = require('../server/router/order.router');
const rateRouter = require('../server/router/rate.router');

// middleware
app.use(morgan('combined'));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(express.raw());
app.use(cors());

// router
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/location", locationRouter);
app.use("/order", orderRouter);
app.use("/api", rateRouter);

// middleware handle error
app.use(errorHandle);

const PORT = 4000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`app is listen on ${PORT}`);
});