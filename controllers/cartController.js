const db = require("../database");
require("dotenv").config();

//GET user cart
const userCart = (req, res) => {
  const ID = req.query.id;
  const QUERY = `SELECT cart.*, product.name, product.price, cart.qty*product.price as total_price FROM db_pharmacy.cart INNER JOIN db_pharmacy.product ON cart.product_id = product.id WHERE user_id=${ID};`;

  db.query(QUERY, (err, result) => {
    let totalPrice = 0;
    console.log(QUERY);

    //Calculate total price in cart
    if (result.length) {
      totalPrice = result
        .map((val) => {
          return val.total_price;
        })
        .reduce((a, b) => {
          return a + b;
        });
    }
    console.log("Total: ", totalPrice);
    return res.status(200).send({ result, totalPrice });
  });
};

//POST cart data
const addToCart = (req, res) => {
  const USERID = req.body.userId;
  const PRODUCTID = req.body.productId;
  const QTY = req.body.qty;
  const QUERY = `INSERT INTO db_pharmacy.cart (\`user_id\`, \`product_id\`, \`qty\`) VALUES (${USERID}, ${PRODUCTID}, ${QTY});`;

  console.log(QUERY);

  db.query(QUERY, (err, result) => {
    res.status(200).send(result);
  });
};

//DELETE cart data
const deleteCart = (req, res) => {
  const ID = req.query.id;
  const QUERY = `DELETE FROM db_pharmacy.cart WHERE id = ${ID};`;

  console.log(QUERY);

  db.query(QUERY, (err, result) => {
    res.status(200).send(result);
  });
};

//UPDATE cart data
const updateCart = (req, res) => {
  const QTY = req.body.qty;
  const ID = req.body.id;
  const QUERY = `UPDATE db_pharmacy.cart SET qty = ${QTY} WHERE id = ${ID};`;

  console.log(QUERY);

  db.query(QUERY, (err, result) => {
    res.status(200).send(result);
  });
};

//DELETE all cart data in user
const deleteAllCart = (req, res) => {
  const ID = req.query.id;
  const QUERY = `DELETE FROM db_pharmacy.cart WHERE user_id = ${ID};`;

  console.log(QUERY);

  db.query(QUERY, (err, result) => {
    res.status(200).send(result);
  });
};

module.exports = { addToCart, userCart, deleteCart, updateCart, deleteAllCart };
