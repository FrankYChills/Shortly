const router = require("express").Router();

const Short = require("../models/Short");

const verifyJWT = require("../middleware/verifyJWT");

const generateShortLink = require("../shorten");

router.post("/", verifyJWT, async (req, res) => {
  if (!req.body.url) {
    return res.status(400).json({ message: "Url is required!" });
  }
  try {
    const link = await Short.findOne({ longUrl: req.body.url }).exec();
    if (link) {
      // if link already exists for that user
      if (link.user == req.user.id) {
        res.status(400).json({
          message: "Short link already exists for the url for the user",
        });
      } else {
        // else link exists but not for that user so generate link
        var shortLink = "http://localhost:4000/" + generateShortLink();
        // save to the DB
        const newLink = {
          longUrl: req.body.url,
          shortUrl: shortLink,
          user: req.user.id,
        };
        const res = await Short.create(newLink);
        return res
          .status(201)
          .json({ message: "link successfully generated", data: res });
      }
    } else {
      // if the longUrl doesn't exists create one
      var shortLink = "http://localhost:4000/" + generateShortLink();
      const newLink = {
        longUrl: req.body.url,
        shortUrl: shortLink,
        user: req.user.id,
      };
      const resp = await Short.create(newLink);
      return res
        .status(201)
        .json({ message: "link successfully generated", data: resp });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
