const express = require("express");
const { userController, productController } = require("../controllers");
const routers = express.Router();

routers.get("/get", userController.getData);
routers.get("/send", userController.forgotEmail);
routers.post("/add-user", userController.addData);
routers.patch("/edit-user/:id", userController.editData);
routers.delete("/delete-user/:iduser", userController.deleteData);

module.exports = routers;
