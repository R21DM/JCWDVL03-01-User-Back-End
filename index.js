const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const db = require("./database");
require("dotenv").config();

const PORT = process.env.PORT || 2000;

// Function to serve all static files
// inside public directory.

//Multer configuration
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.query.name}.jpg`);
  },
});

const upload = multer({
  storage: multerStorage,
});

//Upload Image
app.post("/", upload.single("uploaded-file"), (req, res) => {});

app.use("/products", express.static("public"));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("<h4>Welcome to dev-mysql-api</h4>");
});

//Upload Image
app.post("/", upload.single("uploaded-file"), (req, res) => {
  const USERID = req.query.id;
  const FILENAME = req.file.filename;
  const QUERY = `INSERT INTO db_pharmacy.payment_proof (\`invoice_id\`, \`user_id\`, \`filename\`) SELECT \`id\`, \`user_id\`, \'${FILENAME}\' FROM db_pharmacy.invoice_user_header WHERE db_pharmacy.invoice_user_header.id = (SELECT MAX(id) FROM invoice_user_header WHERE user_id = ${USERID});`;

  console.log(QUERY);

  db.query(QUERY, (err, result) => {
    res.status(200).send(result);
  });
});

const {
  userRouters,
  productRouters,
  registerRouter,
  cartRouters,
  paymentRouters,
  historyRouters,
} = require("./routers");

app.use("/users", userRouters);
app.use("/products", productRouters);
app.use("/", registerRouter);
app.use("/cart", cartRouters);
app.use("/payment", paymentRouters);
app.use("/history", historyRouters);

app.listen(PORT, () => console.log("Api Running :", PORT));
