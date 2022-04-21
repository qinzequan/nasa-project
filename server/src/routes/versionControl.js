const express = require("express");
const planetsRouter = require("./planets/planets.router");
const launchsRouter = require("./launches/launches.router");

const v1Router = express.Router();

v1Router.use("/planets", planetsRouter);
v1Router.use("/launches", launchsRouter);

module.exports = { v1Router };
