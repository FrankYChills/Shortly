const mongoose = require("mongoose");

const shortSchema = new mongoose.Schema(
  {
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, expires: "1d", default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Short", shortSchema);
