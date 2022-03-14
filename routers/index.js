const registerRouter = require("./registerRouters");
const userRouters = require("./userRouters");
const productRouters = require("./productRouters");
const cartRouters = require("./cartRouters");
const paymentRouters = require("./paymentRouters");
const historyRouters = require("./historyRouters");

module.exports = {
  registerRouter,
  userRouters,
  cartRouters,
  productRouters,
  paymentRouters,
  historyRouters
};
