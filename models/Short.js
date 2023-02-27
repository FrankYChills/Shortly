const mongoose = require("mongoose");

const shortSchema = new mongoose.Schema(
  {
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    activeFrom: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 30 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Short", shortSchema);
