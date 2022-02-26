const express = require("express");
const { registerController } = require("../controllers");
const registerRouter = express.Router();

registerRouter.get("/", registerController.getData);
registerRouter.post("/", registerController.postData);

module.exports = registerRouter;
