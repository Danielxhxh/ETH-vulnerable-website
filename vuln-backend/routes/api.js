var express = require("express");
var authRouter = require("./auth");
var productsRouter = require("./products");

var app = express();

app.use("/auth/", authRouter);
app.use("/products/", productsRouter);

module.exports = app;
