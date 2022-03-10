const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);
const db = require("./database");
require("dotenv").config();
//PORT
const PORT = process.env.PORT | 0;
// const PORT = 8000;

// Function to serve all static files
// inside public directory.

app.use("/products", express.static("public"));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("<h4>Welcome to dev-mysql-api</h4>");
});

const {
  userRouters,
  productRouters,
  registerRouter,
  cartRouters,
} = require("./routers");

//Test db connection
db.connect((error) => {
  if (error) console.log(error);

  console.log("Connected at thread id", db.threadId);
});

app.use("/users", userRouters);
app.use("/products", productRouters);
app.use("/", registerRouter);
app.use("/cart", cartRouters);

// app.listen(PORT, () => console.log("Api Running :", PORT));

//Start Server
server.listen(PORT, () => {
  console.log("Socket server is running at port:", PORT);
});
