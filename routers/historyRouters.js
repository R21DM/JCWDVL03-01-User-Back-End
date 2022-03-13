const express = require("express");
const { historyController } = require("../controllers");
const routers = express.Router();

routers.get("/", historyController.userTransactionHistory);

module.exports = routers;
