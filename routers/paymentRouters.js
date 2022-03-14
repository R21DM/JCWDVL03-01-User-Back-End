const express = require("express");
const { paymentController } = require("../controllers");
const routers = express.Router();

routers.post("/", paymentController.postInvoice);

module.exports = routers;
