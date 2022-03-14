const express = require("express");
const { historyController } = require("../controllers");
const routers = express.Router();

routers.get("/", historyController.userTransactionHistory);
routers.get("/:id", historyController.transactionDetailHistory);

module.exports = routers;
