const express = require("express");
const { cartController } = require("../controllers");
const routers = express.Router();

routers.post("/", cartController.addToCart);

module.exports = routers;
