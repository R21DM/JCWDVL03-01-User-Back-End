const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const db = require("./database");
const {
  userRouters,
  productRouters,
  registerRouter,
  cartRouters,
} = require("./routers");

const PORT = 8000;

// Function to serve all static files inside public directory.
app.use("/products", express.static("public"));

//Initialize & Setting Express
app.use(express.json());
app.use(cors());

//Test db connection
db.connect((error) => {
  if (error) console.log(error);

  console.log("Connected at thread id", db.threadId);
});

app.use("/", registerRouter);
app.use("/users", userRouters);
app.use("/products", productRouters);
app.use("/cart", cartRouters);

//Start Server
server.listen(PORT, () => {
  console.log("Socket server is running at port:", PORT);
});
