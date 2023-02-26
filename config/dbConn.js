const mongoose = require("mongoose");

/**
 * This function connects the app to the mongodb server
 */
const connectDB = async () => {
  try {
    mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
