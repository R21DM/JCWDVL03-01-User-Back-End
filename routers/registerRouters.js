const express = require("express");
const { registerController } = require("../controllers");
const routers = express.Router();

routers.get("/", registerController.getData);
routers.post("/", registerController.postData);

module.exports = routers;
