require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const AuthRouter = require("./Routes/AuthRouter");
const PaymentRouter = require("./Routes/PaymentRouter");
const TransactionRouter = require("./Routes/TransactionRouter");
const userRouter = require("./Routes/userRouter");
const app = express();

// Basic middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/auth", AuthRouter);
app.use("/payments", PaymentRouter);
app.use("/transactions", TransactionRouter);
app.use("/users", userRouter);
// Health
app.get("/", (req, res) => {
  res.send("Edviron payments microservice running 🚀");
});

// Error fallback
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
