const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 2000;
const app = express();

// Function to serve all static files
// inside public directory.

app.use("/products", express.static("public"));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("<h4>Welcome to dev-mysql-api</h4>");
});

const { userRouters, productRouters } = require("./routers");

app.use("/users", userRouters);
app.use("/products", productRouters);

app.listen(PORT, () => console.log("Api Running :", PORT));
