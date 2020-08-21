const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const userRouter = require("../server/routes/user");
const slugRouter = require("../server/routes/slug");
require("./helpers/db");
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/../client"));
app.use(morgan("common"));
app.use(helmet());
app.use(userRouter);
app.use(slugRouter);

module.exports = app;
