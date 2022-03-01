const { db } = require("../database");
const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = {
  getData: (req, res) => {
    // Query tidak ditampilkan di sini.
    // Buat seperti: userService.addUser(userData) yang diambil dari userServices

    let scriptQuery = `SELECT * FROM user where username = ${db.escape(
      req.query.username
    )} AND password = ${db.escape(req.query.password)}`;

    if (req.query.email) {
      scriptQuery = `SELECT * FROM user where email = ${db.escape(
        req.query.email
      )}`;
    }

    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  addData: (req, res) => {
    console.log(req.body);
    let { username, password, email, phone } = req.body;
    let addDataUser = `Insert into user values (null,
    ${db.escape(username)},
    ${db.escape(password)},
    ${db.escape(email)},
    ${db.escape(phone)});`;
    console.log(addDataUser);
    db.query(addDataUser, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }

      db.query(
        `Select * from user where username = ${db.escape(username)};`,
        (err2, results2) => {
          if (err2) res.status(500).send(err2);
          res
            .status(200)
            .send({ message: "Penambahan Karyawan Berhasil", data: results2 });
          // res.status(200).send(results)
        }
      );
    });
  },

  editData: (req, res) => {
    let dataUpdate = [];
    for (let prop in req.body) {
      dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
    }

    let updateQuery = `UPDATE user set ${dataUpdate} where id = ${req.params.id};`;
    console.log(updateQuery);
    db.query(updateQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  deleteData: (req, res) => {
    let deleteQuery = `DELETE from user where id = ${db.escape(
      req.params.id
    )};`;

    db.query(deleteQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  forgotEmail: (req, res) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    let scriptQuery = `SELECT * FROM user where email = ${db.escape(
      req.query.email
    )}`;

    db.query(scriptQuery, (err, results) => {
      let respond = results[0];
      if (err) return res.status(500).send(err);
      if (!respond) return res.status(500).send(err);

      let mailOption = {
        from: process.env.EMAIL,
        to: respond.email,
        subject: "Forgot Password",
        text: `Your username: ${respond.username},Your password: ${respond.password}`,
      };

      transporter.sendMail(mailOption, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent");
        }
      });
      res.status(200).send(results);
    });
  },
};
