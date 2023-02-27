const router = require("express").Router();

// use Short Collection
const Short = require("../models/Short");

// user authorization function
const verifyJWT = require("../middleware/verifyJWT");

// short link generator function
const generateShortLink = require("../shorten");

/**
 * ROUTE - "/api/shortit/"
 * METHOD - POST
 * This methods handles the request for shorting the URLs.JWT required.
 */
router.post("/", verifyJWT, async (req, res) => {
  // if no url is passed
  if (!req.body.url) {
    return res.status(400).json({ message: "Url is required!" });
  }
  try {
    // search for the given url in the Short Collection
    const links = await Short.find({ longUrl: req.body.url }).exec();

    if (links?.length) {
      // if link/url already exists for the current user
      for (const link of links) {
        if (link.user == req.user.id) {
          return res.status(400).json({
            message: "Short link already exists for the url for the user",
          });
        }
      }

      // else link/url exists but not for the current user so generate link
      var shortLink = process.env.SERVER_ADDRESS + "/" + generateShortLink();
      // save to the DB
      const newLink = {
        longUrl: req.body.url,
        shortUrl: shortLink,
        user: req.user.id,
      };
      const resp = await Short.create(newLink);
      const { longUrl, shortUrl } = resp;
      res.status(201).json({
        message: "link successfully generated",
        data: { shortUrl, longUrl },
      });
    } else {
      // if the url doesn't exists for the current user then create one
      var shortLink = process.env.SERVER_ADDRESS + "/" + generateShortLink();
      const newLink = {
        longUrl: req.body.url,
        shortUrl: shortLink,
        user: req.user.id,
      };
      const resp = await Short.create(newLink);
      const { longUrl, shortUrl } = resp;
      return res.status(201).json({
        message: "link successfully generated",
        data: { shortUrl, longUrl },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
