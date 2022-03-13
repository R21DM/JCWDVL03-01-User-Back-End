const express = require("express");
const { cartController } = require("../controllers");
const routers = express.Router();

routers.get("/", cartController.userCart);
routers.post("/", cartController.addToCart);
routers.delete("/", cartController.deleteCart);
routers.patch("/", cartController.updateCart);
routers.delete("/deleteCart", cartController.deleteAllCart);

module.exports = routers;
