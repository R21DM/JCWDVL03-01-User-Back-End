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

module.exports = { userTransactionHistory };
