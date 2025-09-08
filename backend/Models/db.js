require(`dotenv`).config();
const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_DB_CONNECTION;
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(`ERROR: ${err}`);
  });
