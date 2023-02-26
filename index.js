require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const connectDB = require("./config/dbConn");

// make an app
const app = express();
const PORT = process.env.PORT || 4000;

const path = require("path");

// cors
const cors = require("cors");
// allow cors
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// allow json payloads
app.use(express.json());

// connect with DB
connectDB();

app.use("/", express.static(path.join(__dirname, "public")));

// handle requests via routers
app.use("/", require("./routes/root"));
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/shortit", require("./routes/shortRoute"));

// listen after app gets connected with mongodb server
mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB Server ☑️");
  app.listen(PORT, () => {
    console.log("Server is listening on PORT", PORT, "🚀");
  });
});

mongoose.connection.on("error", () => {
  console.log(error, "[MongoDB connection error]");
});
