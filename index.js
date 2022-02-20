const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const database = require("./database");
const connection = require("./database");

const PORT = 8000;

//Initialize & Setting Express
app.use(express.json());
app.use(cors());

//Test db connection
database.connect((error) => {
  if (error) console.log(error);

  console.log("Connected at thread id", database.threadId);
});

//GET username and email data
app.get("/register", (req, res) => {
  const USERNAME = req.query.username;
  const EMAIL = req.query.email;
  const QUERY = `SELECT * FROM db_pharmacy.user WHERE username="${USERNAME}" OR email="${EMAIL}"`;

  console.log(QUERY);

  connection.query(QUERY, (err, result) => {
    res.status(200).send(result);
  });
});

//POST Register
app.post("/register", (req, res) => {
  console.log(req.body);
  const USERNAME = req.body.username;
  const PASSWORD = req.body.password;
  const EMAIL = req.body.email;
  const PHONE = "081212345678";

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

  connection.query(QUERY, (err, result) => {
    res.status(200).send(result);
  });
});

//Start Server
server.listen(PORT, () => {
  console.log("Socket server is running at port:", PORT);
});
