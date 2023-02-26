const express = require("express");
const router = express.Router();
const path = require("path");

const Short = require("../models/Short");

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});
router.get("/redirect(.html)?", (req, res) => {
  res.redirect(301, "/");
});

router.get("/:short", async (req, res) => {
  var shortLink = req.params.short;
  shortLink = "http://localhost:4000/" + shortLink;

  try {
    const longLink = await Short.findOne({ shortUrl: shortLink }).exec();
    if (!longLink) {
      return res.status(400).json({ message: "Invalid Short URL!" });
    }
    // redirect to the original/long url
    // user accessed the url so update the activeFrom field so that expiry time increases

    await Short.findOneAndUpdate(
      { shortUrl: longLink.shortUrl },

      { $set: { activeFrom: Date.now() } }
    );

    res.redirect(longLink.longUrl);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
