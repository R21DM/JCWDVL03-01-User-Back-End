const db = require("../database");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

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

  sendEmail: (req, res) => {
    //Create SMTP Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rdmtest95",
        pass: "TESTrdm123",
      },
    });

    //jwt.sign(payload, secretOrPrivateKey, [options, callback])
    //Untuk verifikasi --> Simpan token di db --> Cek token di db
    const token = jwt.sign(
      {
        data: "Token Data",
      },
      "secretkey",
      { expiresIn: "10m" }
    );

    transporter.sendMail(
      {
        from: '"Admin" <rdmtest95@gmail.com>', // sender address
        to: "rdmtest95@gmail.com", // list of receivers
        subject: "Email Verification", // Subject line
        text: `Hi there! 
        You have recently visited our website and entered your email.
        Please click the following link to verify your email http://localhost:3000/verify/${token} 
        Thanks`, // plain text body
        html: `<h2>Hi there!</h2>
        <p>You have recently visited our website and entered your email.</p>
        <p>Please click the following link to verify your email http://localhost:3000/verify/${token}</p>
        <p>Thanks</p>`, // html body
      },
      res.status(200).send("Email sent")
    );
  },
};
