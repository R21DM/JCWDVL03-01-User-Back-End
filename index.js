const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const database = require("./database");
const connection = require("./database");

const PORT = 8000;

app.use(express.json());
app.use(cors());

// test db connection
database.connect((error) => {
  if (error) console.log(error);

  console.log("Connected at thread id", database.threadId);
});

//Controller POST
app.post("/", (req, res) => {
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

server.listen(PORT, () => {
  console.log("Socket server is running at port:", PORT);
});
