const express = require("express");
const router = express.Router();
const path = require("path");

// Use Short Collection
const Short = require("../models/Short");

/**
 * ROUTE - "/"
 * METHOD - GET
 * This methods sends HTML for home page
 */
router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

/**
 * ROUTE - "/short"
 * METHOD - GET
 * This method receives the short URL and then redirects the user to the respective original/long URL.
 */
router.get("/:short", async (req, res) => {
  var shortLink = req.params.short;
  shortLink = process.env.SERVER_ADDRESS + "/" + shortLink;

  try {
    // search for the short url in the Short Collection
    const longLink = await Short.findOne({ shortUrl: shortLink }).exec();
    // if no short url exists
    if (!longLink) {
      return res.status(400).json({ message: "Invalid Short URL!" });
    }
    // redirect to the original/long url

    // IMPORTANT - user accessed the url so update the activeFrom field so that expiry time increases

    // set the starting time to the current time
    await Short.findOneAndUpdate(
      { shortUrl: longLink.shortUrl },

      { $set: { activeFrom: Date.now() } }
    );
    //  redirect
    res.redirect(longLink.longUrl);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
