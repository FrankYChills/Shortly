require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const connectDB = require("./config/dbConn");

// make an app
const app = express();
const PORT = process.env.PORT || 3500;

// allow json payloads
app.use(express.json);

// connect with DB
connectDB();

// handle reqs
app.use("/api/auth", require("./routes/authRoute"));

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB Server ☑️");
  app.listen(PORT, () => {
    console.log("Server is listening on PORT ", PORT, " 🚀");
  });
});

mongoose.connection.on("error", () => {
  console.log(error, "[MongoDB connection error]");
});
