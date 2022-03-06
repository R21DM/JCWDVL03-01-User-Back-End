const db = require("../database");
require("dotenv").config();

//POST cart data
const addToCart = (req, res) => {
  const USERID = req.body.userId;
  const PRODUCTID = req.body.productId;
  const QTY = req.body.qty;
  const PRICE = req.body.price;
  const QUERY = `INSERT INTO db_pharmacy.cart (\`user_id\`, \`product_id\`, \`qty\`, \`price\`) VALUES (${USERID}, ${PRODUCTID}, ${QTY}, ${PRICE});`;

  console.log(QUERY);

  db.query(QUERY, (err, result) => {
    res.status(200).send(result);
  });
};

module.exports = { addToCart };
