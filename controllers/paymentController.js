const db = require("../database");
require("dotenv").config();

//POST invoice data
const postInvoice = (req, res) => {
  //POST Invoice Header
  const INV_CODE = `INV${Date.now()}`;
  const USERID = req.body.id;
  const TOTAL_PRICE = req.body.total;
  const ADDRESS = req.body.address;
  const CITY = req.body.city;
  const ZIP = req.body.zip;
  const DELIVERY = req.body.delivery;
  let QUERY = `INSERT INTO db_pharmacy.invoice_user_header (\`code\`, \`user_id\`, \`total_price\`, \`address\`, \`city\`, \`zip_code\`, \`shipping\`) VALUES (\'${INV_CODE}\', \'${USERID}\', \'${TOTAL_PRICE}\', \'${ADDRESS}\', \'${CITY}\', \'${ZIP}\', \'${DELIVERY}\');`;

  console.log(QUERY);

  db.query(QUERY, (err, result) => {
    //POST Invoice Detail
    let QUERY = `INSERT INTO db_pharmacy.invoice_user_detail (\`product_id\`, \`invoice_id\`, \`price\`, \`qty\`) SELECT product_id, invoice_user_header.id, price, qty FROM db_pharmacy.cart INNER JOIN db_pharmacy.product ON cart.product_id = product.id INNER JOIN db_pharmacy.invoice_user_header WHERE (cart.user_id=${USERID} AND invoice_user_header.id = (SELECT MAX(id) FROM invoice_user_header WHERE user_id = cart.user_id));`;

    console.log(QUERY);

    db.query(QUERY, (err, result) => {
      res.status(200).send(result);
    });
  });
};

module.exports = { postInvoice };
