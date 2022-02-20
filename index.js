const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const db = require("./database");
const { registerRouters } = require("./routers");

const PORT = 8000;

//Initialize & Setting Express
app.use(express.json());
app.use(cors());

//Test db connection
db.connect((error) => {
  if (error) console.log(error);

  console.log("Connected at thread id", db.threadId);
});

app.use("/register", registerRouters);

//Start Server
server.listen(PORT, () => {
  console.log("Socket server is running at port:", PORT);
});
