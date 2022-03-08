const db = require("../database");
const nodemailer = require("nodemailer");
require("dotenv").config();
const bcrypt = require("bcrypt");

module.exports = {
  getData: (req, res) => {
    // Query tidak ditampilkan di sini.
    // Buat seperti: userService.addUser(userData) yang diambil dari userServices

    // if (req.query.email) {
    //   userQuery = `SELECT * FROM user where email = ${db.escape(
    //     req.query.email
    //   )}`;
    // }

    // if (!req.query.username) res.status(500).send("error");
    // if (!req.query.password) res.status(500).send("error");

    var userQuery = "";
    var stored_hash = "";

    if (req.body.password) {
      var reqPassword = req.body.password;
    }
    if (req.body.username) {
      var usernameError = "false";
      let hash = `SELECT * FROM user where username = ${db.escape(
        req.body.username
      )}`;

      db.query(hash, async (err, results) => {
        if (!results) return res.status(500).send(err);
        if (err) return res.status(500).send(err);

        if (reqPassword === undefined) {
          return res.status(500).send(err);
        }

        stored_hash = results[0].password;
        console.log("password:", reqPassword);
        console.log("stored_hash:", stored_hash);

        const SALT = bcrypt.genSaltSync(10);
        const hashed_password = bcrypt.hashSync(reqPassword, SALT);

        console.log("hashed_password:", hashed_password);

        if (await bcrypt.compare(reqPassword, stored_hash)) {
          console.log("true");
          userQuery = `SELECT * FROM user where username = ${db.escape(
            req.body.username
          )}`;
          db.query(userQuery, (err, results) => {
            console.log(results);
            if (err) res.status(500).send(err);
            res.status(200).send(results);
          });
        } else {
          if (req.body.password === req.body.username) {
            userQuery = `SELECT * FROM user where username = ${db.escape(
              req.body.username
            )}`;
            db.query(userQuery, (err, results) => {
              console.log(results);
              res.status(200).send(results);
              if (err) res.status(500).send(err);
            });
          } else {
            console.log("false");
            return res.status(500).send(err);
          }
        }

        if (!stored_hash) return res.status(500).send(err);
      });
    } else {
      if (usernameError === undefined) {
        return db.query(userQuery, (err, results) => {
          res.status(500).send(err);
        });
      }
    }
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
        html: `<h2>Hi there ${respond.username}!</h2>
      <p>You have recently visited our website and requested for your password.</p>
      <p>Your username: ${respond.username},</p>
      <p>Your password: ${respond.password}</p>
      <p>Thank you</p>`, // html body
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
