const express = require("express");
const { router } = require("json-server");
const { cartController } = require("../controllers");
const routers = express.Router();

routers.get("/", cartController.userCart);
routers.post("/", cartController.addToCart);
routers.delete("/", cartController.deleteCart);
routers.patch("/", cartController.updateCart);

module.exports = routers;
