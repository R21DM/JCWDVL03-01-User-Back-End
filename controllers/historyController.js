const db = require("../database");
require("dotenv").config();

//GET user transaction history
const userTransactionHistory = (req, res) => {
  const ID = req.query.id;
  const QUERY = `SELECT id, code, total_price, status FROM db_pharmacy.invoice_user_header WHERE user_id=${ID};`;

  db.query(QUERY, (err, result) => {
    console.log(QUERY);
    return res.status(200).send(result);
  });
};

//GET transaction detail history
const transactionDetailHistory = (req, res) => {
  const ID = req.params.id;
  const QUERY = `SELECT invoice_user_detail.*, name, code, status, total_price, shipping FROM (db_pharmacy.invoice_user_detail INNER JOIN db_pharmacy.product ON product_id = product.id INNER JOIN db_pharmacy.invoice_user_header ON invoice_id = invoice_user_header.id) WHERE invoice_id=${ID};`;

  db.query(QUERY, (err, result) => {
    console.log(QUERY);
    return res.status(200).send(result);
  });
};

module.exports = { userTransactionHistory, transactionDetailHistory };
