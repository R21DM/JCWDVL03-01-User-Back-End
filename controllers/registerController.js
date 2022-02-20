const db = require("../database");

module.exports = {
  //GET username and email data
  getData: (req, res) => {
    const USERNAME = req.query.username;
    const EMAIL = req.query.email;
    const QUERY = `SELECT * FROM db_pharmacy.user WHERE username="${USERNAME}" OR email="${EMAIL}"`;

    console.log(QUERY);

    db.query(QUERY, (err, result) => {
      res.status(200).send(result);
    });
  },

  //POST Register
  postData: (req, res) => {
    const USERNAME = req.body.username;
    const PASSWORD = req.body.password;
    const EMAIL = req.body.email;
    const PHONE = req.body.phone;

    const QUERY =
      "INSERT INTO `db_pharmacy`.`user` (`username`, `password`, `email`, `phone`) VALUES ('" +
      USERNAME +
      "', '" +
      PASSWORD +
      "', '" +
      EMAIL +
      "', '" +
      PHONE +
      "');";

    console.log(QUERY);

    db.query(QUERY, (err, result) => {
      res.status(200).send(result);
    });
  },
};
