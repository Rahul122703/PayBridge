const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
require(`./Models/db`);
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const app = express();
app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
